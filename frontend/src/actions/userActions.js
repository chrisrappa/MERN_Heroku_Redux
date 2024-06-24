import axios from 'axios';
import { 
  USER_INFO_SAVE_REQUEST,
  USER_INFO_SAVE_SUCCESS,
  USER_INFO_SAVE_FAIL,
  SUBTRACT_CREDITS_REQUEST,
  SUBTRACT_CREDITS_SUCCESS,
  SUBTRACT_CREDITS_FAIL,
} from "../consts/userConstants";

export const config = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};


export const saveUserInfo = (userInfo) => async(dispatch) => {
  
  const url = `${process.env.REACT_APP_API_PATH}api/user/signin`;

  dispatch({type: USER_INFO_SAVE_REQUEST});

  const checkForNameAndEmail = () => {
    if(userInfo?.name === '' || !userInfo?.email){
      return { ...userInfo, name: null, email: null }; 
    };

    return userInfo;
  };

  try{

    const response = await axios.post(url, checkForNameAndEmail(), config);

    let isAdmin = false;

    if(response.status === 200){

      if(response.data._id === "6671e19111acfc02a927b86c"){
        await axios.post(`${process.env.REACT_APP_API_PATH}api/user/makeAdmin`, {userId: response.data._id}, config)
        .then(() => isAdmin = true);
      };
      
      const userInfoForState = {
        ...userInfo,
        user_id: response?.data?._id,
        userCredits: response?.data?.userCredits,
        isAdmin: isAdmin,
        email: response?.data?.email
      };

      dispatch({
        type: USER_INFO_SAVE_SUCCESS, 
        payload: userInfoForState
      });

    };

  } catch(err) {

    dispatch({type: USER_INFO_SAVE_FAIL, payload: err.message});

  };
};

export const subtractCreditsFromUser = (userId) => async(dispatch) => {

  const path = `${process.env.REACT_APP_API_PATH}api/user/subtractCredits`;

  dispatch({ type: SUBTRACT_CREDITS_REQUEST });

  try{

    const response = await axios.post(path, {userId: userId}, config);
    
    if(response?.status === 200){
      dispatch({ type: SUBTRACT_CREDITS_SUCCESS });
    };

  } catch (error) {
    dispatch({ type: SUBTRACT_CREDITS_FAIL, payload: error.message});
  };
};
