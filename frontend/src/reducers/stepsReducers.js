import {
  ARTWORK_GENERATION_FAIL,
  ARTWORK_GENERATION_REQUEST,
  ARTWORK_GENERATION_SUCCESS,
  IMAGE_DB_SAVE_SUCCESS,
  BASE64_IMAGE_UPDATE_SUCCESS,
  LOGO_COMBINED_IMAGE_UPDATE_SUCCESS,
} from "../consts/artProcessConstants";

export const stepsReducer = (state = {}, action) => {

  switch(action.type){
    case  ARTWORK_GENERATION_REQUEST: 
      return {
        ...state, 
        currentInfo: {
          ...state.currentInfo,
          artworkProps: {
            ...state?.currentInfo?.artworkProps,
            isLoading: action.payload.isLoading
          }
        }
      }
    case  ARTWORK_GENERATION_SUCCESS: 
      return {
        ...state, 
        currentInfo: {
          ...state.currentInfo,
          artworkProps: {
            ...state?.currentInfo?.artworkProps,
            base64Collection: action.payload.data.collection,
            isLoading: action.payload.isLoading
          }
        }
      }
    case  ARTWORK_GENERATION_FAIL: 
      return {
        ...state, 
        currentInfo: {
          ...state.currentInfo,
          artworkProps: {
            ...state?.currentInfo?.artworkProps,
            isLoading: action.payload.isLoading,
            error: action.payload.data
          }
        }
      }
    case  BASE64_IMAGE_UPDATE_SUCCESS: 
      return {
        ...state, 
        currentInfo: { 
          ...state.currentInfo,
          artworkProps: {
            ...state?.currentInfo?.artworkProps,
            ...action.payload,
            base64Image: action.payload.base64Image,
          }
        }
      };
    case  LOGO_COMBINED_IMAGE_UPDATE_SUCCESS: 
      return {
        ...state, 
        currentInfo: { 
          ...state.currentInfo,
          artworkProps: {
            ...state?.currentInfo?.artworkProps,
            imageWithOverlay: action.payload,
          }
        }
      };
    case  IMAGE_DB_SAVE_SUCCESS: 
      return {
        ...state, 
        completedWorks: [
          ...state.completedWorks.slice(0, action.payload.index),
          {
            ...state.completedWorks[action.payload.index],
            imageHostedURL: action.payload.response,
          },
          ...state.completedWorks.slice(action.payload.index + 1),
        ]
      };
    default: return {
      ...state
    };
  };
}
