import { 
  ORDER_STATUS_UPDATE_FAIL, 
  ORDER_STATUS_UPDATE_REQUEST, 
  ORDER_STATUS_UPDATE_SUCCESS 
} from "../consts/printfulConstants";
import { 
  CHECK_UPSCALE_ERROR, 
  CHECK_UPSCALE_PROCESSING, 
  CHECK_UPSCALE_SUCCESS 
} from "../consts/artProcessConstants";
import {
  CREATE_PAYMENT_METHOD_SUCCESS,
  PAYMENT_SUBMISSION_REQUEST,
  PAYMENT_SUBMISSION_SUCCESS,
  SHIPPING_INFO_SAVE_SUCCESS,
  USER_ARTWORK_DELETE_SUCCESS,
  USER_ARTWORK_SAVE_REQUEST,
  USER_ARTWORK_SAVE_SUCCESS,
  USER_INFO_SAVE_SUCCESS,
  USER_LOGO_DELETE_SUCCESS,
  USER_LOGO_SAVE_SUCCESS,
  CARD_DELETE_SUCCESS,
  SHIPPING_DELETE_SUCCESS,
  SUBTRACT_CREDITS_SUCCESS,
  UPDATE_PAYMENT_DATA_SUCCESS,
  UPDATE_SHIPPING_INFO_SUCCESS,
} from "../consts/userConstants";
import {
  USER_ORDER_PLACED_SUCCESS,
  USER_ORDERS_INFO_SUCCESS,
  PURCHASE_CREDITS_SUCCESS,
  PAYMENT_SECRET_CLEAR,
} from "../consts/orderPlacementConstants";

export const userDataReducer = (state = {}, action) => {
  
  switch(action.type){
    case  CREATE_PAYMENT_METHOD_SUCCESS: 
      return {
        ...state, 
        paymentInfo: {
          ...state.paymentInfo,
          paymentMethodId: action.payload
        }
      };
    case CARD_DELETE_SUCCESS: 
      const paymentMethodId = action.payload;
      const updatedPaymentMethods = state?.loginInfo?.paymentMethods?.filter(
        paymentMethod => {
          return paymentMethod?._id !== paymentMethodId
        }
      );
    
      return {
        ...state,
        loginInfo: {
          ...state?.loginInfo,
          paymentMethods: updatedPaymentMethods
        }
      };
    case PAYMENT_SUBMISSION_REQUEST:
      return {
        ...state,
        paymentInfo: {
          ...state.paymentInfo,
          submittingPayment: true
        }
      };
    case PAYMENT_SUBMISSION_SUCCESS:
      return {
        ...state,
        paymentInfo: {
          ...state.paymentInfo,
          clientSecret: action.payload,
          submittingPayment: false
        }
      }
    case UPDATE_PAYMENT_DATA_SUCCESS:
      return {
        ...state,
        loginInfo: {
            ...state.loginInfo,
            paymentMethods: state.loginInfo.paymentMethods.map(payment => 
                payment._id === action.payload.dbPaymentId 
                    ? { ...action.payload } 
                    : action.payload.defaultPayment 
                      ? { ...payment, defaultPayment: false } 
                      : { ...payment }
            )
        }
    }
    case PAYMENT_SECRET_CLEAR: 
      return {
        ...state,
        paymentInfo: {
          ...state?.paymentInfo,
          clientSecret: null
        }
      };
    case PURCHASE_CREDITS_SUCCESS:
      return {
        ...state,
        loginInfo: {
          ...state?.loginInfo,
          userCredits: state?.loginInfo?.userCredits + action?.payload
        }
      };
    case SUBTRACT_CREDITS_SUCCESS:
      return {
        ...state,
        loginInfo: {
          ...state?.loginInfo,
          userCredits: state?.loginInfo?.userCredits - 1
        }
      };
    case SHIPPING_INFO_SAVE_SUCCESS:
      return {
        ...state,
        loginInfo: {
          ...state.loginInfo,
          shippingAddresses: [ 
            ...state.loginInfo.shippingAddresses,
            action.payload
          ]
        }
      };
    case UPDATE_SHIPPING_INFO_SUCCESS:
      return {
        ...state,
        loginInfo: {
          ...state.loginInfo,
          shippingAddresses: state.loginInfo.shippingAddresses.map(address => 
            address._id === action.payload.dbShippingId
              ? { ...action.payload } 
              : action.payload.defaultShipping 
                ? { ...address, defaultShipping: false } 
                : { ...address }
          )
        }
      }
    case SHIPPING_DELETE_SUCCESS: 
      const addressId = action.payload;
      const updateShippingAddresses = state?.loginInfo?.shippingAddresses.filter(
        address => {
          return address?._id !== addressId
        }
      );
      
      return {
        ...state,
        loginInfo: {
          ...state?.loginInfo,
          shippingAddresses: updateShippingAddresses
        }
      };
    case USER_INFO_SAVE_SUCCESS: 
      return {
        ...state,
        loginInfo: action.payload
      };
    case USER_ORDERS_INFO_SUCCESS: 
      return {
        ...state,
        ordersInfo: action.payload
      };
    // case ORDER_STATUS_UPDATE_REQUEST:
    //   return {
    //     ...state,
    //     ordersInfo: state.ordersInfo?.map(order => 
    //       order.printfulOrderId === action.payload.orderId ? 
    //       { ...order, orderStatus: action.payload.orderStatus } : 
    //       order
    //     )
    //   }
    // case ORDER_STATUS_UPDATE_SUCCESS:
    //   return {
    //     ...state,
    //     ordersInfo: state.ordersInfo?.map(order => 
    //       order.printfulOrderId === action.payload.orderId ? 
    //       { 
    //         ...order, 
    //         orderStatus: action.payload.orderStatus, 
    //         shippingService: action.payload.shippingService 
    //       } : order
    //     )
    //   }
    // case ORDER_STATUS_UPDATE_FAIL:
    //   return {
    //     ...state,
    //     ordersInfo: state.ordersInfo?.map(order => 
    //       order.orderId === action.payload.orderId ? 
    //       { ...order, orderStatus: action.payload.error } : 
    //       order
    //     )
    //   }
    case USER_LOGO_SAVE_SUCCESS: 
      return {
        ...state, 
        loginInfo: {
          ...state.loginInfo,
          logos: [
            ...state.loginInfo.logos,
            action.payload
          ]
        }
      };
    case USER_LOGO_DELETE_SUCCESS: 
      return {
        ...state, 
        loginInfo: {
          ...state.loginInfo,
          logos: state.loginInfo.logos.filter(
            logo => logo.cloudinaryUrl !== action.payload
          )
        }
      };
    case USER_ORDER_PLACED_SUCCESS:
      return {
        ...state,
        ordersInfo: [
          state.ordersInfo,
          action.payload
        ]
      }
    case USER_ARTWORK_DELETE_SUCCESS: 
      return {
        ...state, 
        loginInfo: {
          ...state.loginInfo,
          generatedArtworks: state.loginInfo.generatedArtworks.filter(
            artwork => artwork?._id !== action.payload
          )
        }
      };
    case USER_ARTWORK_SAVE_REQUEST: 
      return {
        ...state,
        artworkSaving: action.payload.isLoading
      };
    case USER_ARTWORK_SAVE_SUCCESS: 
      return {
        ...state,
        artworkSaving: action.payload.isLoading,
        loginInfo: {
          ...state.loginInfo,
          generatedArtworks: [
            state?.loginInfo?.generatedArtworks, 
            action.payload.artworkData
          ]
        }
      };
    case CHECK_UPSCALE_PROCESSING:
      return {
        ...state,
        loginInfo: {
          ...state.loginInfo,
          generatedArtworks: state.loginInfo.generatedArtworks.map(artwork => 
            artwork.upscaleJobId === action.payload ? {
              ...artwork,
              upscaleProcessing: true,
              upscaleStatus: 'processing',
            } : artwork
          ),
        }
      }
    case CHECK_UPSCALE_ERROR: 
      return {
        ...state,
        loginInfo: {
          ...state.loginInfo,
          generatedArtworks: state.loginInfo.generatedArtworks.map(artwork => 
            artwork.upscaleJobId === action.payload ? {
              ...artwork,
              upscaleProcessing: false,
              upscaleStatus: 'incomplete',
              upscaledImageUrl: 'error'
            } : artwork
          ),
        }
      };
    case CHECK_UPSCALE_SUCCESS: 
      return {
        ...state,
        loginInfo: {
          ...state.loginInfo,
          generatedArtworks: state.loginInfo.generatedArtworks.map(artwork => 
            artwork.upscaleJobId === action.payload.jobId ? {
              ...artwork,
              upscaleProcessing: false,
              upscaleStatus: 'complete',
              upscaledImageUrl: action.payload.upscaleImageUrl
            } : artwork
          ),
        }
      }
    default: return {
      ...state
    };
  };
}