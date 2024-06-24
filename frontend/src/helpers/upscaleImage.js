
import { queryUpscalingJob } from "../actions/artworkProcessing";
import { storeImagesInCloudinary } from "./dbImageSave";

export const upscaleImage = (userInfo, newImage, dispatch) => {

  const createCloudinaryUrl = async(imageData, userId) => {
    return await storeImagesInCloudinary(imageData, userId)
    .then((res) => { return res?.data });
  };  

  if(userInfo?.user_id){
    if(!newImage){
      if(userInfo?.generatedArtworks.length){
        userInfo?.generatedArtworks?.forEach(artwork => {
          if (artwork?.upscaleProcessing) {
            dispatch(
              queryUpscalingJob(
                artwork.upscaleJobId, 
                createCloudinaryUrl,
                userInfo.user_id,
                artwork?._id,
                dispatch
              )
            );
          };
        });
      };

      return null;
    };
  };

  dispatch(
    queryUpscalingJob(
      newImage?.upscaleJobId,
      createCloudinaryUrl,
      userInfo?.user_id,
      newImage?._id,
      dispatch
    )
  )

  return null;
};