import { 
  GET_ALL_USER_ORDERS_FAIL, 
  GET_ALL_USER_ORDERS_REQUEST, 
  GET_ALL_USER_ORDERS_SUCCESS 
} from "../consts/adminConstants";


export const adminReducer = (state = {}, action) => {
  
  switch(action.type){
    case GET_ALL_USER_ORDERS_REQUEST:
      return {
        ...state,
        isLoading: action.payload.isLoading
      }
    case GET_ALL_USER_ORDERS_SUCCESS: 
      return {
        ...state,
        isLoading: action.payload.isLoading,
        allUserOrders: action.payload.orders
      }
    case GET_ALL_USER_ORDERS_FAIL: 
      return {
        ...state,
        error: action.error
      };
    default: return {
      ...state
    };
  };
}