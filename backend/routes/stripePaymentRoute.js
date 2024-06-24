import express from 'express';
import * as dotenv from 'dotenv';
import stripe from 'stripe';
import User from '../models/userModel.js';
import bodyParser from 'body-parser';

dotenv.config();

const router = express();
const stripeApi = stripe(process.env.STRIPE_SECRET_KEY); 

router.post('/processItemOrderPayment', async (req, res) => {

  const { totalPrice, currency, selectedPayment, description } = req.body;

  try {
    const paymentIntent = await stripeApi.paymentIntents.create({
      amount: totalPrice, // amount in cents
      currency: currency,
      payment_method_types: ['card'],
      payment_method: selectedPayment?.id,
      customer: selectedPayment?.customer,
      description: description,
      off_session: false,
      statement_descriptor: 'Retail Order',
      confirm: true
    });

    res.send({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.post('/purchaseCredits', async (req, res) => {
  const { userId, paymentMethod, creditAmount, creditCost } = req.body;

  try {
    const user = await User.findById(userId);
    if (user) {
      const parsedCreditAmount = parseFloat(creditAmount);
      
      if (!isNaN(parsedCreditAmount)) {

        const paymentIntent = await stripeApi.paymentIntents.create({
          amount: creditCost, // amount in cents
          currency: 'USD',
          payment_method_types: ['card'],
          payment_method: paymentMethod?.id,
          description: `Purchase ${parsedCreditAmount} generation credits`,
          statement_descriptor: 'Art Generation Credits',
          customer: paymentMethod?.customer,
          off_session: false,
          confirm: true
        });

        if (paymentIntent?.client_secret) {
          res.status(200).send({ client_secret: paymentIntent?.client_secret });
        } else {
          res.status(500).send({ error: 'Payment did not succeed' });
        }
      } else {
        res.status(400).send({ error: 'Invalid creditAmount value' });
      }
    } else {
      res.status(400).send({ error: 'User not found or client_secret not provided' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.post('/createPaymentMethod', async (req, res) => {

  const {
    cardNumber,
    expiryMonth,
    expiryYear,
    cvv,
    firstName,
    lastName,
    email,
    addressOne,
    addressTwo,
    city,
    state,
    zipCode,
    country,
    stripeCustomerId
  } = req.body;

  try {
    const paymentMethod = await stripeApi.paymentMethods.create({
      type: 'card',
      card: {
        number: cardNumber,
        exp_month: expiryMonth,
        exp_year: expiryYear,
        cvc: cvv,
      },
      billing_details: {
        name: `${firstName, lastName}`,
        email: email,
        address: {
          line1: addressOne,
          line2: addressTwo,
          city: city,
          state: state,
          postal_code: zipCode,
          country: country,
        },
      }
    });

    if(paymentMethod?.id){
      try{
        await stripeApi.paymentMethods.attach(
          paymentMethod?.id,
          {
            customer: stripeCustomerId
          }
        );

        res.status(200).send(paymentMethod?.id)

      } catch (error) {
        res.status(500).send('Error creating payment')
      }
    }

  } catch (error) {
    res.send(error.message);
  }
});

router.post('/updatePaymentData', async (req, res) => {
 
  const updatedPaymentData = req.body.paymentUpdateforSubmit;
  const userId = req.body.userId;
  const user = await User.findById(userId);
 
  if (updatedPaymentData.defaultPayment) {
 
   user.paymentMethods = user.paymentMethods.map(payment => {
 
    if (payment._id.toString() === updatedPaymentData.dbPaymentId) {
      
      return updatedPaymentData;
    } else {
 
      return {
        ...payment.toObject(),
        defaultPayment: false
      };
    }
   });
   
  } else {
 
   user.paymentMethods = user.paymentMethods.map(payment => {
 
    if (payment._id.toString() === updatedPaymentData.dbPaymentId) {

      return updatedPaymentData;
    } else {
 
      return payment;
    }
   });
  }
 
  user.markModified('paymentMethods');
 
  try {
   const updatedUser = await user.save();
   res.status(200).send({
    message: 'Payment Data Updated',
    data: updatedUser
   });
 
  } catch (error) {
 
   res.status(500).send({
    message: 'Error occurred while updating Payment Data.',
    error: error.message
   });
  }
 });

router.post('/payment-setup-intent', async(req, res) => {
  const customerId = req?.body?.customerId;

  const setupIntent = await stripeApi.setupIntents.create({
    customer: customerId,
    automatic_payment_methods: {
      enabled: true,
    }
  });

  res.json({client_secret: setupIntent.client_secret});
});

router.post('/userPaymentMethods', async(req, res) => {
  const customerId = req.body.stripeCustomerId;
  
  try {
    const paymentMethods = await stripeApi.paymentMethods.list({
      customer: customerId,
      type: 'card', 
    });

    res.status(200).send(paymentMethods.data);
  } catch (error) {
    res.status(500).send(error);
  }
})

router.post('/createSubscription', async(req, res) => {

  const customerId      = req.body.selectedPaymentMethod?.customer;
  const priceId         = req.body.priceId;
  const userId          = req.body.userId;
  const paymentMethodId = req.body.selectedPaymentMethod?.id;

  try{
    const response = await stripeApi.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId
        }
      ],
      default_payment_method: paymentMethodId
    });

    res.status(200).send(response);

  } catch (error){
    res.status(400).send(error.message);
  }
});

router.post('/getCustomerSubs', async(req, res) => {
  const customerId = req.body.stripeCustomerId;

  try{
    const subscription = await stripeApi.subscriptions.list({
      limit: 1,
      customer: customerId
    });

    res.status(200).send(subscription?.data[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/updateSubscription', async (req, res) => {
  const { subscriptionId, newPriceId } = req.body;
  
  try {
    const subscription = await stripeApi.subscriptions.retrieve(subscriptionId);
    const currentItemId = subscription.items.data[0].id;
  
    const updatedSubscription = await stripeApi.subscriptions.update(subscriptionId, {
      items: [{
        id: currentItemId,
        price: newPriceId,
      }],
    });
  
    res.status(200).send(updatedSubscription);
  } catch (error) {
    console.error('Error updating subscription price: ', error);
    res.status(500).send(error);
  }
});

router.delete('/cancelSubscription', async(req, res) => {
  const stripeApi = stripe(process.env.STRIPE_SECRET_KEY);
  const subscriptionId = req.body.subscriptionId;

  if(subscriptionId){
    try{
      const subscription = await stripeApi.subscriptions.del(
        `${subscriptionId}`
      );
    
      res.status(200).send(subscription);
    } catch (error){
      res.status(500).send(error);
    }
  }
});

router.get('/prices', async(req, res) => {
  const stripeApi = stripe(process.env.STRIPE_SECRET_KEY); 

  try{
    const { data } = await stripeApi?.plans?.list({limit: 12});
    const activeSubOptions = data.filter((price) => price?.active);
    res.status(200).send(activeSubOptions);

  } catch (error){
    res.status(400).send(error.message);
  }
});

router.get('/stripeProducts', async(req, res) => { 

  const stripeApi = stripe(process.env.STRIPE_SECRET_KEY); 

  try{
    const { data } = await stripeApi?.products?.list();
    const activeProducts = data?.filter(product => product?.active);
    res.status(200).send(activeProducts);

  } catch (error){
    res.status(400).send(error.message);
  }
});


export default router;