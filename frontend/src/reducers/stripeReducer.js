import { SUBSCRIPTION_PRODUCT_SUCCESS, USER_STRIPE_PAYMENT_METHODS_SUCCESS } from "../consts/stripeConstants"
import { CARD_DELETE_SUCCESS } from "../consts/userConstants";


export const stripeReducer = (state = {}, action) => {
  
  switch(action.type){
    case SUBSCRIPTION_PRODUCT_SUCCESS:
      return {
        ...state,
        subscriptionOptions: action.payload
      }
    case USER_STRIPE_PAYMENT_METHODS_SUCCESS: 
      return {
        ...state,
        userStripePaymentMethods: action.payload
      }
    case CARD_DELETE_SUCCESS: 
      const paymentMethodId = action.payload;
      const updatedPaymentMethods = state?.userStripePaymentMethods?.filter(
        paymentMethod => {
          return paymentMethod?.id !== paymentMethodId
        }
      );
    
      return {
        ...state,
        userStripePaymentMethods: updatedPaymentMethods
      };
    default: return {
      ...state
    };
  };
}
