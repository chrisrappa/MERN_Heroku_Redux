import { 
  UPSCALE_JOB_CREATE_SUCCESS 
} from "../consts/artProcessConstants";
import { 
  ORDER_SAVE_FAIL, 
  ORDER_SAVE_REQUEST, 
  ORDER_SAVE_SUCCESS 
} from "../consts/orderPlacementConstants";


export const orderDataReducer = (state = {}, action) => {
  
  switch(action.type){
    case ORDER_SAVE_REQUEST:
      return {
        ...state,
        orderSubmitting: action.payload.isSubmitting
      }
    case ORDER_SAVE_SUCCESS: 
      return {
        ...state,
        orders: [
          ...state.orders,
          action.payload.data
        ],
        orderSubmitting: action.payload.isSubmitting
      }
    case ORDER_SAVE_FAIL:
      return {
        ...state,
        orderSubmitting: action.payload.isSubmitting
      }
    case UPSCALE_JOB_CREATE_SUCCESS:
      return {
        ...state,
        processingOrderItems: action.payload
      }
    default: return {
      ...state
    };
  };
}