import { 
  GET_PRINTFUL_PRODUCT_FAIL,
  GET_PRINTFUL_PRODUCT_REQUEST,
  GET_PRINTFUL_PRODUCT_SUCCESS, 
  RETRIEVE_TEMPLATE_DATA_SUCCESS, 
} from "../consts/printfulConstants";

export const productReducer = (state = {}, action) => {
  
  switch(action.type){
    case RETRIEVE_TEMPLATE_DATA_SUCCESS:
      return {
        ...state,
        editProductTemplate: action.payload
      }
    case GET_PRINTFUL_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: action.payload.isLoading
      }
    case GET_PRINTFUL_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        productsListInfo: action.payload.data
      }
    case GET_PRINTFUL_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        error: action.payload.error
      }
    default: return {
      ...state
    };
  };
}
