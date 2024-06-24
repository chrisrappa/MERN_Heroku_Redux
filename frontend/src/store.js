import { 
  applyMiddleware , 
  combineReducers , 
  compose         , 
  createStore
} from "redux";
import thunk from "redux-thunk";
import { stepsReducer     } from "./reducers/stepsReducers"   ;
import { userDataReducer  } from "./reducers/userDataReducer" ;
import { productReducer   } from "./reducers/productReducer"  ;
import { cartReducer      } from "./reducers/cartReducer"     ;
import { orderDataReducer } from "./reducers/orderDataReducer";
import { stripeReducer    } from "./reducers/stripeReducer"   ;
import { klaviyoReducer } from "./reducers/klaviyoReducer";
import { adminReducer } from "./reducers/adminReducer";

const initialState = {
  stepData: {
    currentStep: 0,
    currentInfo: {
      artworkProps: {
        base64Image       : null  ,
        imageWithOverlay  : null  ,
        imageHostedURL    : null  ,
        prompt            : null  ,
        styles            : null  ,
        colors            : null  ,
        lightings         : null  ,
        upscaleJobWorking : false ,
        isLoading         : false ,
        error             : null  ,
        base64Collection  : null
      },
    },
    completedWorks: [],
  },
  userData: {
    paymentInfo: {
      clientSecret      : null  ,
      submittingPayment : false ,
      paymentMethodId   : null
    },
    loginInfo: {
      userCredits       : null,
      shippingAddresses : []  ,
      savedWorks : []
    },
    ordersInfo    : null,
    artworkSaving : false
  },
  productInfo: {
    isLoading                 : false ,
    productsListInfo          : null  ,
    editProductTemplate       : null  ,
    error                     : null
  },
  cartInfo: {
    cartItems       : [],
    orderCostTotals : null
  },
  orderData: {
    orders: [],
    orderSubmitting         : false ,
    processingOrderItems    : []    ,
    processingOrderUserData : {}
  },
  stripeData: {
    subscriptionOptions     : [],
    userStripePaymentMethods: []
  },
  klaviyo: {
    email: null,
    isLoading: false,
    error: null
  },
  adminData: {
    allUserOrders: []
  }
};

const reducers = combineReducers({
  stepData    : stepsReducer    ,
  userData    : userDataReducer ,
  productInfo : productReducer  ,
  cartInfo    : cartReducer     ,
  orderData   : orderDataReducer,
  stripeData  : stripeReducer   ,
  klaviyo     : klaviyoReducer  ,
  adminData   : adminReducer
});

const composeEnhancer = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true})) || compose;
const store = createStore(reducers, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;