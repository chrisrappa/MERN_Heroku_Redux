import axios from "axios";
import { 
  KLAVIYO_SAVE_FAIL, 
  KLAVIYO_SAVE_REQUEST, 
  KLAVIYO_SAVE_SUCCESS 
} from "../consts/klaviyoConstants";

export const config = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export const saveKlaviyoSubscribe = (email) => async(dispatch) => {

  dispatch({ type: KLAVIYO_SAVE_REQUEST , payload: { isLoading: true }});

  const url = `${process.env.REACT_APP_API_PATH}api/klaviyo/addProfile`;
  const subscribeUrl = `${process.env.REACT_APP_API_PATH}api/klaviyo/subscribe`;

  try{
    const response = await axios.post(url, {email: email}, config);
    
    if(response?.status === 200){
      const subscribeResponse = await axios.post(
        subscribeUrl, 
        { 
          email: email, 
          id: response?.data?.data?.data?.id
        }, 
        config
      );

      if(subscribeResponse.status === 204){
        dispatch({
          type: KLAVIYO_SAVE_SUCCESS,
          payload: {
            data: email, 
            isLoading: false
          }
        });  
      };
    };

    if(response?.status === 201){
      const subscribeResponse = await axios.post(
        subscribeUrl, 
        { 
          email: email, 
          id: response?.data?.id
        }, 
        config
      );

      if(subscribeResponse.status === 204){
        dispatch({
          type: KLAVIYO_SAVE_SUCCESS,
          payload: {
            data: email, 
            isLoading: false
          }
        });  
      };
    }

  } catch(error) {
    
    if(error?.response?.status === 400){
      dispatch({
        type: KLAVIYO_SAVE_FAIL,
        payload: { error: error?.response?.data?.error?.detail }
      })
    };
    
    if(error?.response?.status === 500){
      dispatch({
        type: KLAVIYO_SAVE_FAIL,
        error: error?.response ?? 'error'
      })
    };
  };
}