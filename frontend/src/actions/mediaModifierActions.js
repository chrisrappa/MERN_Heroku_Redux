import axios from "axios";
import { 
  CREATE_MEDIAMOD_MOCKUP_FAIL, 
  CREATE_MEDIAMOD_MOCKUP_REQUEST, 
  CREATE_MEDIAMOD_MOCKUP_SUCCESS 
} from "../consts/mediaModConstants";

export const makeMediaModifierMockup = (
  templateInfo,
  imageInfo,
  imageDimensions,
  productInfo
) => async(dispatch) => {
  
  const mockupURL = `${process.env.REACT_APP_API_PATH}api/mediaMod/mockupGen`;

  const data = {
    nr: templateInfo.nr,
    templateWidth: templateInfo.width,
    templateHeight: templateInfo.height,
    imagePlacementLayerId: templateInfo.imagePlacementLayerId,
    stickerColorLayerId: templateInfo.stickerColorLayerId,
    backgroundColorLayerId: templateInfo.backgroundColorLayerId,
    image: imageInfo,
    imageHeight: imageDimensions?.height,
    imageWidth: imageDimensions?.width
  };

  dispatch({ type: CREATE_MEDIAMOD_MOCKUP_REQUEST, payload: 'loading' });
  
  try{

    const response = await axios.post(mockupURL, data);

    dispatch({ 
      type: CREATE_MEDIAMOD_MOCKUP_SUCCESS, 
      payload: {...productInfo, mockupImage: response?.data?.url}
    });

  } catch(error){
    dispatch({ type: CREATE_MEDIAMOD_MOCKUP_FAIL, payload: error.message});
  }
};