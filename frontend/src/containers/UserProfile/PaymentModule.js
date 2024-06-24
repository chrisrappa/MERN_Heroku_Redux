import React, { useMemo, useState } from 'react';
import { Grid } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { useToast } from '../../libs/toast';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeSetupForm from './StripeSetupForm';
import axios from 'axios';

export const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_AUTH_KEY}`);

function PaymentModule({
  updatePaymentView,
  stripeCustomerId
}) {

  // const dispatch = useDispatch();
  // const toast    = useToast()   ;

  const [clientSecret, setClientSecret] = useState('');

  const options = {
    clientSecret: clientSecret,
    appearance: {/*...*/},
  };

  useMemo(async() => {
    if(!clientSecret){
      const {data: { client_secret }} = await axios.post(
        `${process.env.REACT_APP_API_PATH}api/stripe/payment-setup-intent`, 
        {
          customerId: stripeCustomerId,
        }
      );
  
      setClientSecret(client_secret)
    };
  }, [clientSecret, stripeCustomerId]);

  return (
    <Grid item sx={{height: '100%'}}>
      {
        clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <StripeSetupForm 
              clientSecret={clientSecret} 
              updatePaymentView={updatePaymentView}
            />
          </Elements>
        )
      }
    </Grid>
  )
}

export default PaymentModule;