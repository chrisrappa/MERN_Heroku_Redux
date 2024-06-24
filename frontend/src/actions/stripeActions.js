import axios from "axios";
import { 
  USER_STRIPE_PAYMENT_METHODS_FAIL, 
  USER_STRIPE_PAYMENT_METHODS_REQUEST, 
  USER_STRIPE_PAYMENT_METHODS_SUCCESS 
} from "../consts/stripeConstants";

export const config = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export const getUserStripePaymentMethods = (stripeCustomerId) => async(dispatch) => {

  dispatch({ type: USER_STRIPE_PAYMENT_METHODS_REQUEST });

  const url = `${process.env.REACT_APP_API_PATH}api/stripe/userPaymentMethods`;

  try{
    const response = await axios.post(url, {stripeCustomerId}, config);
    
    dispatch({ type: USER_STRIPE_PAYMENT_METHODS_SUCCESS, payload: response.data});

  } catch(error) {
    dispatch({ type: USER_STRIPE_PAYMENT_METHODS_FAIL, payload: error});
  }
};