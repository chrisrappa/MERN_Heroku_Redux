import axios from 'axios';
import { 
  SHIPPING_INFO_SAVE_REQUEST,
  SHIPPING_INFO_SAVE_SUCCESS,
  SHIPPING_INFO_SAVE_FAIL,
  USER_INFO_SAVE_REQUEST,
  USER_INFO_SAVE_SUCCESS,
  USER_INFO_SAVE_FAIL,
  USER_ARTWORK_SAVE_REQUEST,
  USER_ARTWORK_SAVE_SUCCESS,
  USER_ARTWORK_SAVE_FAIL,
  USER_LOGO_SAVE_REQUEST,
  USER_LOGO_SAVE_SUCCESS,
  USER_LOGO_SAVE_FAIL,
  USER_LOGO_DELETE_REQUEST,
  USER_LOGO_DELETE_SUCCESS,
  USER_LOGO_DELETE_FAIL,
  USER_ARTWORK_DELETE_REQUEST,
  USER_ARTWORK_DELETE_SUCCESS,
  USER_ARTWORK_DELETE_FAIL,
  CARD_DELETE_REQUEST,
  CARD_DELETE_SUCCESS,
  CARD_DELETE_FAIL,
  SHIPPING_DELETE_REQUEST,
  SHIPPING_DELETE_SUCCESS,
  SHIPPING_DELETE_FAIL,
  SUBTRACT_CREDITS_REQUEST,
  SUBTRACT_CREDITS_SUCCESS,
  SUBTRACT_CREDITS_FAIL,
  PAYMENT_SUBMISSION_REQUEST,
  PAYMENT_SUBMISSION_SUCCESS,
  PAYMENT_SUBMISSION_FAIL,
  UPDATE_PAYMENT_DATA_REQUEST,
  UPDATE_PAYMENT_DATA_SUCCESS,
  UPDATE_PAYMENT_DATA_FAIL,
  UPDATE_SHIPPING_INFO_REQUEST,
  UPDATE_SHIPPING_INFO_SUCCESS,
  UPDATE_SHIPPING_INFO_FAIL,
} from "../consts/userConstants";

export const config = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export const processPayment = (
  paymentInfo
) => async(dispatch) => {

  dispatch({ type: PAYMENT_SUBMISSION_REQUEST });

  const url = `${process.env.REACT_APP_API_PATH}api/stripe/processItemOrderPayment`;

  try {

    const paymentResponse = await axios.post(
      url, 
      paymentInfo, 
      config
    );

    dispatch({ 
      type: PAYMENT_SUBMISSION_SUCCESS, 
      payload: paymentResponse?.data?.client_secret
    });

    if(paymentResponse.status === 200){
      return paymentResponse.status;
    };

  } catch (error) {
    dispatch({ type: PAYMENT_SUBMISSION_FAIL, payload: error.message});
    return error.message;
  }
};

export const deleteCardInfo = (userId, paymentMethodId) => async(dispatch) => {

  const url = `${process.env.REACT_APP_API_PATH}api/user/paymentDelete`;

  dispatch({ type: CARD_DELETE_REQUEST });

  try{
    const response = await axios.post(
      url,
      {userId: userId, paymentMethodId: paymentMethodId},
      config
    );

    if(response?.status === 200){
      dispatch({ type: CARD_DELETE_SUCCESS, payload: paymentMethodId });
      return response.status;
    }
  } catch (error){
    dispatch({ type: CARD_DELETE_FAIL, payload: error.message });
    return error.message;
  }
};

export const saveShippingInfo = (
  shippingData, userId
) => async(dispatch) => {

  dispatch({type: SHIPPING_INFO_SAVE_REQUEST});
  const url = `${process.env.REACT_APP_API_PATH}api/user/shipping`;

  try {

    const response = await axios.post(
      url, 
      {userId, shippingData}, 
      config
    );

    if(response.status === 200){
      dispatch({
        type: SHIPPING_INFO_SAVE_SUCCESS, 
        payload: response?.data
      });
      
      return response.status;
    };


    if(response.status === 201){
      return response.status;
    }

  } catch (error) {

    dispatch({
      type: SHIPPING_INFO_SAVE_FAIL, 
      payload: error.message
    });

    return error.message;
  };
};

export const updateShippingData = (
  userId, 
  updatedShippingInfo
) => async(dispatch) => {

  dispatch({ type: UPDATE_SHIPPING_INFO_REQUEST});

  const path = `${process.env.REACT_APP_API_PATH}api/user/updateShippingData`;

  try{
    const response = await axios.post(
      path, { userId: userId, updatedShippingInfo: updatedShippingInfo }, config
    );
    
    if(response.status === 200){
      dispatch({ type: UPDATE_SHIPPING_INFO_SUCCESS, payload: updatedShippingInfo});
    };

    return response?.status;

  } catch (error) {
    dispatch({ type: UPDATE_SHIPPING_INFO_FAIL, payload: error.message});
    return ('Error updating shipping address, details - ', error.message);
  };

};

export const deleteShippingInfo = (userId, addressId) => async(dispatch) => {
  const url = `${process.env.REACT_APP_API_PATH}api/user/shippingDelete`;

  dispatch({ type: SHIPPING_DELETE_REQUEST });

  try{
    const response = await axios.post(
      url,
      {userId: userId, addressId: addressId},
      config
    );

    if(response?.status === 200){
      dispatch({ type: SHIPPING_DELETE_SUCCESS, payload: addressId });
      return response.status;
    }
  } catch (error){
    dispatch({ type: SHIPPING_DELETE_FAIL, payload: error.message });

    return error.message;
  }
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
        paymentMethods: response?.data?.paymentMethods,
        shippingAddresses: response?.data?.shippingAddresses,
        logos: response?.data?.logos,
        generatedArtworks: response?.data?.generatedArtworks,
        stripeCustomerId: response?.data?.stripeCustomerId,
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


export const saveArtworkInUserProfile = (artworkInfo, user_id) => async(dispatch) => {

  dispatch({type: USER_ARTWORK_SAVE_REQUEST, payload: {isLoading: true}});
  const url = `${process.env.REACT_APP_API_PATH}api/user/saveGenArtwork`;

  try{
    const response = await axios.post(
      url, 
      {
        artworkData: artworkInfo, 
        user_id: user_id
      },
      config
    );
        
    if(response.status === 200){

      dispatch({ 
        type: USER_ARTWORK_SAVE_SUCCESS, 
        payload: {
          isLoading: false,
          artworkData: response?.data 
        }
      });

      return response;
    };

  } catch(err) {

    console.log('err', err)
    dispatch({
      type: USER_ARTWORK_SAVE_FAIL, 
      payload: {error: err.message, isLoading: false}
    });

    return err.message;
  };
};

export const uploadLogoToUser = (user_id, logoUrl) => async(dispatch) => {

  const url = `${process.env.REACT_APP_API_PATH}api/user/saveLogo`;

  dispatch({ type: USER_LOGO_SAVE_REQUEST });

  try{
    const response = await axios.post(url, {
      logo: { cloudinaryUrl: logoUrl },
      user_id: user_id
    }, config);


    if(response.status === 200){

      dispatch({
        type: USER_LOGO_SAVE_SUCCESS, 
        payload: response?.data
      });

      return response.status;
    };
  } catch(err){
    dispatch({type: USER_LOGO_SAVE_FAIL, payload: err.message});
    return err.message;
  }
};

export const deleteLogoFromUser = (user_id, logoUrl) => async(dispatch) => {

  const url = `${process.env.REACT_APP_API_PATH}api/user/deleteLogo`;

  dispatch({ type: USER_LOGO_DELETE_REQUEST });

  try{
    const response = await axios.post(url, {
      logo: logoUrl,
      user_id: user_id
    }, config);

    if(response.status === 200){
      dispatch({
        type: USER_LOGO_DELETE_SUCCESS, 
        payload: logoUrl
      });

      return response.status;
    };
  } catch(err){
    dispatch({type: USER_LOGO_DELETE_FAIL, payload: err.message});
    return err.message;
  }
};

export const deleteArtworkFromUser = (user_id, artworkId) => async(dispatch) => {

  const url = `${process.env.REACT_APP_API_PATH}api/user/deleteArtwork`;

  dispatch({ type: USER_ARTWORK_DELETE_REQUEST });

  try{
    const response = await axios.post(url, {
      artworkId: artworkId,
      user_id: user_id
    }, config);

    if(response.status === 200){
      dispatch({
        type: USER_ARTWORK_DELETE_SUCCESS, 
        payload: artworkId
      });

      return response.status;
    };
  } catch(err){
    dispatch({type: USER_ARTWORK_DELETE_FAIL, payload: err.message});
    return err.message;
  }
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

export const updatePaymentBillingData = (
  userId, paymentUpdateforSubmit
) => async(dispatch) => {

  dispatch({ type: UPDATE_PAYMENT_DATA_REQUEST});

  const path = `${process.env.REACT_APP_API_PATH}api/stripe/updatePaymentData`;

  try{
    const response = await axios.post(
      path, { userId, paymentUpdateforSubmit }, config
    );

    if(response.status === 200){
      dispatch({ type: UPDATE_PAYMENT_DATA_SUCCESS, payload: paymentUpdateforSubmit });
    };

  } catch (error) {
    dispatch({ type: UPDATE_PAYMENT_DATA_FAIL, payload: error.message});
  };
};

