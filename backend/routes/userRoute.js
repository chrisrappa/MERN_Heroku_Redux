import express from 'express';
import User from '../models/userModel.js';
import Payment from '../models/paymentModel.js';
import Shipping from '../models/shippingModel.js';
import Order from '../models/orderModel.js';
import stripe from 'stripe';
import mongoose from 'mongoose';
import fetch from 'node-fetch';

const router = express();
const stripeApi = stripe(process.env.STRIPE_SECRET_KEY); 

router.post("/signin", async (req, res) => {
  const { name, email, user_id } = req.body;

  try {
    let user;

    // Attempt to find user by email and name
    if (name && email) {
      user = await User.findOne({ email, username: name }).exec();
    }

    // If user not found, attempt to find by thirdPartyId
    if (!user && user_id) {
      user = await User.findOne({ thirdPartyId: user_id }).exec();
    }

    // If user still not found, create a new user
    if (!user) {
      const stripeCustomerId = null; // Replace with actual stripe customer ID logic if needed

      user = new User({
        username: name || user_id, // Use name if available, otherwise user_id
        email: email || '', // Use email if available, otherwise empty string
        picture: req.body.picture,
        thirdPartyId: user_id,
        stripeCustomerId: stripeCustomerId,
        userCredits: 50
      });

      await user.save();
    }

    // Send the user object in response
    res.status(200).send(user);

  } catch (error) {
    console.error('Error in sign-in:', error);
    res.status(500).send("Error occurred while processing sign-in.");
  }
});

router.post("/makeAdmin", async(req, res) => {
  const userId = req.body.userId;

  try{

    const user = await User.findById(userId);
      
    if (!user) {
      return res.status(404).send('User not found');
    };

    user.isAdmin = true;

    console.log('user', user);
    user.save();

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/shipping", async(req, res) => {
  const userId = req.body.userId;
  const user = await User.findById(userId);

  const shippingData = req.body.shippingData;
  const shippingAddress = new Shipping(shippingData);

  const checkForExistingShippingAddress = () => {

    if(user?.shippingAddresses.length > 0){

      return user?.shippingAddresses?.some(
        (addresses) => {
          return (
            addresses?.addressOne === shippingData?.addressOne
          );
        }
      );
    }; 
      
    return false;
    
  };

  if(checkForExistingShippingAddress() === false){
    user.shippingAddresses.push(shippingAddress);
    user.name = `${shippingAddress?.firstName} ${shippingAddress?.lastName}`;

    try{
      await user.save();
      res.status(200).send(shippingAddress);
    } catch (error){
      res.status(500).send(error);
      console.error('Error: ', error);
    }
  } else {
    res.status(201).send({msg: "Shipping address already exists"});
  };
});

router.post('/updateShippingData', async (req, res) => {
  const updatedShippingInfo = req.body.updatedShippingInfo;
  const userId = req.body.userId;
  const user = await User.findById(userId);

  if (updatedShippingInfo.defaultShipping) {
    user.shippingAddresses = user.shippingAddresses.map(address => {
      if (address._id.toString() === updatedShippingInfo.dbShippingId) {
        return updatedShippingInfo;
      } else {
        return { ...address.toObject(), defaultShipping: false };
      }
    });
  } else {
    user.shippingAddresses = user.shippingAddresses.map(address => {
      if (address._id.toString() === updatedShippingInfo.dbShippingId) {
        return updatedShippingInfo;
      } else {
        return address;
      }
    });
  }

  user.markModified('shippingAddresses');

  const updatedUser = await user.save();

  if (updatedUser) {
    res.status(200).send({ message: 'Shipping Address Updated', data: updatedUser });
  } else {
    res.status(500).send({ message: 'Error updating shipping address.' });
  }
});

router.post("/shippingDelete", async (req, res) => {
  const userId = req.body.userId;
  const addressId = req.body.addressId;

  try {
    const user = await User.findById(userId);

    const addressIndex = user.shippingAddresses.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (addressIndex !== -1) {
      user.shippingAddresses.splice(addressIndex, 1);

      await user.save();
      res.status(200).send({ msg: "Shipping removed" });
    } else {
      res.status(404).send({ msg: "Shipping not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).send({ msg: "Error deleting shipping method" });
  }
});

router.post("/paymentDelete", async (req, res) => {
  const paymentMethodId = req.body.paymentMethodId;

  try {
    await stripeApi.paymentMethods.detach(
      `${paymentMethodId}`
    );

    res.status(200).send({ paymentMethodId: paymentMethodId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error removing card from customer in Stripe');
  };
});

router.post("/paymentSave", async(req, res) => {
    
  const userId        = req.body.userId;
  const user          = await User.findById(userId);
  const paymentData   = req.body.paymentData;
  const paymentMethod = new Payment(paymentData);

  const paymentMethodExists = () => {
    if(user?.paymentMethods){
      user?.paymentMethods?.some(
      (payments) => {
        return payments.cardNumber === paymentData.cardNumber
      });
    };
  };

  if(!paymentMethodExists()){
    user.paymentMethods.push(paymentMethod);
    user.save((err) => {
      if (err) {
        console.error(err);
        res.status(400).send(err);
        return;
      }
  
      res.status(200).send(paymentMethod);
    });
  } else {
    res.status(201).send({data: "Payment method already exists"});
  }
});

router.post("/orderSave", async(req, res) => {
  const orderData = {
    ...req.body,
    user: req.body.user,
  };

  console.log('req body', req.body.user)

  const user = await User.findById(req.body.user);
  const order = new Order(orderData);


  try{

    if(!user.email){
      user.email = orderData?.email;
      await user.save();
    };

    await order.save();
    res.status(200).send(order);
  } catch(error){
    console.log('error', error)
    res.status(400).send(order);
  }
});

router.post('/saveGenArtwork', async(req, res) => {

  const user = await User.findById(req.body.user_id);
  const artworkData = req?.body?.artworkData;

  try{
    user.savedWorks.push(artworkData);

    await user.save();
    const newArtwork = user.savedWorks[user.savedWorks.length - 1];

    res.status(200).send(newArtwork);
  } catch(error){
    res.status(400).send('There was a problem saving the generated artwork.');
  };

});

router.post('/saveUpscaledArtwork', async(req, res) => {

  const user = await User.findById(req.body.user_id);
  const upscaledImageUrl = req?.body?.upscaledImageUrl;
  const originalGeneratedImageId = req?.body?.imageId;

  try{
    let artworkToUpdate = user.generatedArtworks.find(
      artwork => artwork._id.toString() === originalGeneratedImageId
    );

    if (artworkToUpdate) {
      artworkToUpdate.upscaledImageUrl  = upscaledImageUrl;
      artworkToUpdate.upscaleProcessing = false;
      artworkToUpdate.upscaleStatus = 'complete';
      user.markModified('generatedArtworks');
            
      await user.save();
      res.status(200).send(artworkToUpdate);
    } else {
      throw new Error("Artwork not found");
    }

  } catch(error){
    res.status(500).send('There was a problem saving the upscaled artwork.');
  }

});

router.post('/saveLogo', async(req, res) => {

  const user = await User.findById(req.body.user_id);

  try{
    user.logos.push(req.body.logo);

    await user.save();
    res.status(200).send(req.body.logo);
  } catch(error){
    console.error('api error', error);
    res.status(400).send('There was a problem saving the logo.');
  }

});

router.post('/saveCredits', async (req, res) => {
  const userId = req.body.userId;
  const creditAmount = req.body.creditAmount;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    };

    user.userCredits += creditAmount;
    user.markModified('userCredits');
    await user.save();
    
    res.status(200).send('Credits added');
  } catch (error) {
    res.status(400).send('There was a problem adding credits.');
  }
});

router.post('/subtractCredits', async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findById({_id: userId});
    if (!user) {
      return res.status(404).send('User not found');
    };

    user.userCredits -= 1;

    await user.save();
    
    res.status(200).send('Credits removed');
  } catch (error) {
    res.status(400).send('There was a problem adding credits.');
  }
});

router.post('/deleteLogo', async (req, res) => {

  try {
    const user = await User.findById(req.body.user_id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const logoIndex = user.logos.findIndex(
      logo => logo.cloudinaryUrl === req.body.logo
    );

    if (logoIndex === -1) {
      return res.status(404).send('Logo not found');
    }

    user.logos.splice(logoIndex, 1);
    await user.save();
    
    res.status(200).send('Logo deleted successfully');
  } catch (error) {
    console.error('api error', error);
    res.status(400).send('There was a problem deleting the logo.');
  }
});

router.post('/deleteArtwork', async (req, res) => {

  try {
    const user = await User.findById(req.body.user_id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const artworkIndex = user.generatedArtworks.findIndex(
      artwork => artwork._id == req.body.artworkId
    );

    if (artworkIndex === -1) {
      return res.status(404).send('Artwork not found');
    }

    user.generatedArtworks.splice(artworkIndex, 1);
    await user.save();
    
    res.status(200).send('Artwork deleted successfully');
  } catch (error) {
    console.error('api error', error);
    res.status(400).send('There was a problem deleting the artwork.');
  }
});

router.post('/hostedImageBase64', async(req, res) => {
  try {
    const imageUrl = req.body.url;
    const imageURLRes = await fetch(imageUrl);
    const imageBuffer = await imageURLRes.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    res.status(200).send(base64Image);

  } catch (error){
    res.status(500).send(error.message);
  }
});

router.post('/updateSubscription', async(req, res) => {
  const userId  = req.body.userId            ;
  const priceId = req.body.priceId           ;
  const user    = await User.findById(userId);
});

router.post("/userArtworks", async(req, res) => {
  const userId = req.body.user_id;
  const user = await User.findById(userId);

  if(user){
    res.status(200).send(user?.savedWorks);
  } else {
    res.status(400).send({msg: "User doesn't exist"});
  }
});

router.get("/userInfo", async(req, res) => {
  const userId = req.body.user_id;
  const user = await User.findById(userId);

  if(user){
    res.status(200).send(user);
  } else {
    res.status(400).send({msg: "User doesn't exist"});
  }
});

router.get("/orders/:userId", async (req, res) => {
  
  const userId = new mongoose.Types.ObjectId(req.params.userId);

  console.log('userid', userId);

  try{
    const orders = await Order.find({ user: userId });

    console.log('orders', orders);

    res.status(200).json(orders ?? {});
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;