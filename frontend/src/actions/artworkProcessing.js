import axios from "axios";
import {
  ARTWORK_GENERATION_REQUEST,
  ARTWORK_GENERATION_SUCCESS,
  ARTWORK_GENERATION_FAIL,
  IMAGE_DB_SAVE_REQUEST,
  IMAGE_DB_SAVE_SUCCESS,
  IMAGE_DB_SAVE_FAIL,
  UPSCALE_JOB_CREATE_FAIL, 
  UPSCALE_JOB_CREATE_REQUEST, 
  UPSCALE_JOB_CREATE_SUCCESS,
  CHECK_UPSCALE_ERROR, 
  CHECK_UPSCALE_SUCCESS, 
  ARTWORK_VARIATION_REQUEST,
  ARTWORK_VARIATION_FAIL,
  BASE64_IMAGE_UPDATE_SUCCESS,
  BASE64_IMAGE_UPDATE_FAIL
} from '../consts/artProcessConstants';

export const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
};

export const artGeneratorDispatcher = (value) => async (dispatch) => {

  dispatch({ type: ARTWORK_GENERATION_REQUEST, payload: { isLoading: true }});

  const url = `${process.env.REACT_APP_API_PATH}api/dale`;
  
  try {
    const response = await axios.post(url, value, config);

    dispatch({
      type: ARTWORK_GENERATION_SUCCESS, 
      payload: {
        isLoading: false,
        data: {
          collection: response?.data?.collection,
        }
      }
    });

  } catch(error) {
    dispatch({
      type: ARTWORK_GENERATION_FAIL , 
      payload: { isLoading: false, error: error.message }
    });
  }
};

export const saveArtworkToState = (imageData, artworkData) => async (dispatch) => {
    
  try {
    dispatch({
      type: BASE64_IMAGE_UPDATE_SUCCESS, 
      payload: { ...artworkData, base64Image: imageData }
    });

  } catch(error) {
    dispatch({
      type: BASE64_IMAGE_UPDATE_FAIL , 
      payload: { isLoading: false, error: error.message }
    });
  }
};

export const artworkVariationDispatcher = (base64SourceImage) => async (dispatch) => {

  dispatch({ type: ARTWORK_VARIATION_REQUEST, payload: { isLoading: true }});

  const url = `${process.env.REACT_APP_API_PATH}api/dale/variation`;
  
  try {
    const response = await axios.post(url, base64SourceImage, config);

    // dispatch({
    //   type: ARTWORK_GENERATION_SUCCESS, 
    //   payload: {
    //     isLoading: false,
    //     data: {
    //       collection: response?.data?.collection,
    //     }
    //   }
    // });

  } catch(error) {


    dispatch({
      type: ARTWORK_VARIATION_FAIL , 
      payload: { isLoading: false, error: error.message }
    });
  }
};

export const uploadImageToDB = (base64Image, index) => async(dispatch) => {

  dispatch({ type: IMAGE_DB_SAVE_REQUEST });

  try{

    const path = `${process.env.REACT_APP_API_PATH}api/artworkSave`;
    const body = {uri: base64Image};
    const response = await axios.post(path, body);

    dispatch({ 
      type: IMAGE_DB_SAVE_SUCCESS, 
      payload: {response: response?.data, index: index}
    });

  } catch(err) {

    dispatch({ 
      type: IMAGE_DB_SAVE_FAIL, 
      payload: err.message
    });

  }
};

export const submitUpscaleJob = (imageUrl) => async(dispatch) => {
  dispatch({ type: UPSCALE_JOB_CREATE_REQUEST });

  try{
    const url = `${process.env.REACT_APP_API_PATH}api/bigJpgUpscale`;

    const response = await axios.post(url, { imageUrl: imageUrl});
        
    if(response.status === 200){
      dispatch({ type: UPSCALE_JOB_CREATE_SUCCESS, payload: response?.data });
      return { tid: response?.data, status: 200 };
    };

    return null;

  } catch(error){
  
    dispatch({ type: UPSCALE_JOB_CREATE_FAIL, payload: error.message });
    return {error: error.message, status: 400};
  };
};

export const queryUpscalingJob = (jobId, createCloudinaryUrl, user_id, imageId) => async(dispatch) => {

  const userDbSaveUrl = `${process.env.REACT_APP_API_PATH}api/user/saveUpscaledArtwork`;

  const checkStatus = async () => {

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PATH}api/bigJpgUpscale/retrieveJob`, 
        { jobId }
      );

      const { status, upscaledImage } = await response.data;

      if (status === 'success') {
        const upscaleImageUrl = await createCloudinaryUrl(upscaledImage, user_id);

        if(upscaleImageUrl){
          const response = await axios.post(
            userDbSaveUrl, 
            {
              upscaledImageUrl: upscaleImageUrl, 
              user_id: user_id,
              imageId: imageId
            },
            config
          );

          if(response.status === 200){
            dispatch({ type: CHECK_UPSCALE_SUCCESS, payload: { jobId, upscaleImageUrl } });
          } else {
            console.error('Error saving image to user profile in state');
          }
        } else {
          console.error('Error saving upscaled image to cloudinary');
          dispatch({ type: CHECK_UPSCALE_ERROR, payload: jobId });
          return;
        }
      } else if (status === 'error') {
        dispatch({ type: CHECK_UPSCALE_ERROR, payload: jobId });
        return;
      } else {
        // If the status is still 'processing', schedule another check
        setTimeout(checkStatus, 10000); // Adjust the interval as needed
      }
    } catch (error) {
      console.error('Error checking upscale status:', error);
      dispatch({ type: CHECK_UPSCALE_ERROR, payload: jobId });
      return;
    };
  };

  if(jobId){
    setTimeout(checkStatus, 10000); // Initiate the first check
  }
};