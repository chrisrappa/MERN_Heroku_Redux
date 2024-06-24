import React, { useEffect, useState } from 'react'
import {
  PaymentElement,
  useStripe, 
  useElements,
  CardElement
} from '@stripe/react-stripe-js';
import { useToast } from '../../libs/toast';
import { useDispatch, useSelector } from 'react-redux';
import { getUserStripePaymentMethods } from '../../actions/stripeActions';

export const CardElementWrapper = React.forwardRef((props, ref) => (
  <span {...props} ref={ref}>
      <CardElement />
  </span>
));

function StripeSetupForm({
  clientSecret,
  updatePaymentView
}) {
  
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state?.userData?.loginInfo);

  // const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  console.log('Stripe Message', message);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return null;
    }

    const response = await stripe.confirmSetup({
      elements,
      redirect:'if_required'
    });

    if(response?.setupIntent?.status === 'succeeded'){
      toast.success('Payment Method Saved!');
      dispatch(getUserStripePaymentMethods(userInfo?.stripeCustomerId, dispatch));
      updatePaymentView('List');
    } else {
      toast.error('Error Adding Payment Method');
    };
  };

  // useEffect(() => {
  //   if (!stripe || !clientSecret) {
  //     return;
  //   }

  //   // Retrieve the "setup_intent_client_secret" query parameter appended to
  //   // your return_url by Stripe.js

  //   // Retrieve the SetupIntent
  //   stripe
  //     .retrieveSetupIntent(clientSecret)
  //     .then(({setupIntent}) => {
  //       // Inspect the SetupIntent `status` to indicate the status of the payment
  //       // to your customer.
  //       //
  //       // Some payment methods will [immediately succeed or fail][0] upon
  //       // confirmation, while others will first enter a `processing` state.
  //       //
  //       // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
  //       switch (setupIntent.status) {
  //         case 'succeeded':
  //           setMessage('Success! Your payment method has been saved.');
  //           break;

  //         case 'processing':
  //           setMessage("Processing payment details. We'll update you when processing is complete.");
  //           break;

  //         case 'requires_payment_method':
  //           // Redirect your user back to your payment page to attempt collecting
  //           // payment again
  //           setMessage('Failed to process payment details. Please try another payment method.');
  //           break;
  //         default: return null;
  //       }
  //     });
  // }, [stripe, clientSecret]);

  return (
    <form 
      style={{
        width: '100%', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <div
        style={{display: 'flex', width: '100%', flex: '1', justifyContent: 'flex-start', alignItems: 'center'}}
      >
        <img 
          src='https://res.cloudinary.com/djrbfvpit/image/upload/v1703977307/poweredbystripecropped_zzxvdg.png' 
          alt='Powered by Stripe' 
          style={{height: '2.25rem', width: '10rem'}}
        />
      </div>
      <div style={{width: '100%', flex: '4'}}>
        <PaymentElement />
      </div>
      <div
        style={{
          display: 'flex', 
          width: '100%', 
          flex: '1',
          alignItems: 'flex-end'
        }}
      >
        <div 
          style={{
            display: 'flex', 
            width: '100%', 
            flex: '1',
            justifyContent: 'flex-start',
          }}
        >
          <button
            style={{
              fontFamily: 'Avenir',
              color: 'white',
              fontSize: '14px',
              textShadow: '0px 0px 0px #DEDEDE',
              boxShadow: '0px 0px 0px #F9F9F9',
              padding: '10px 25px',
              borderRadius: '5px',
              border:'0px solid #3866A3',
              background: '#0B779F',
              cursor: 'pointer'
            }}    
            onClick={(e) => handleSubmit(e)}
          >
            Save
          </button>
        </div>
        <div 
          style={{
            display: 'flex', 
            width: '100%', 
            flex: '1',
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
          }}
        >
          <button
            style={{
              fontFamily: 'Avenir',
              color: '#0B779F',
              fontSize: '14px',
              textShadow: '0px 0px 0px #DEDEDE',
              boxShadow: '0px 0px 0px #F9F9F9',
              padding: '10px 25px',
              borderRadius: '5px',
              border:'1px solid #0B779F',
              background: 'transparent',
              cursor: 'pointer'
            }}
            onClick={() => updatePaymentView('List')}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}

export default StripeSetupForm