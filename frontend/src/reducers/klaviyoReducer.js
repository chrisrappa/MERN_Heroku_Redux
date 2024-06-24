import { KLAVIYO_SAVE_FAIL, KLAVIYO_SAVE_REQUEST, KLAVIYO_SAVE_SUCCESS } from "../consts/klaviyoConstants";


export const klaviyoReducer = (state = {}, action) => {
  
  switch(action.type){
    case KLAVIYO_SAVE_REQUEST:
      return {
        ...state,
        isLoading: action.payload.isLoading
      }
    case KLAVIYO_SAVE_SUCCESS: 
      return {
        ...state,
        email: action.payload.data,
        isLoading: action.payload.isLoading
      }
    case KLAVIYO_SAVE_FAIL:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false
      }
    default: return {
      ...state
    };
  };
}