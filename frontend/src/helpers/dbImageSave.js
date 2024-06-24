import axios from 'axios';

const storeImagesInCloudinary = async(image, userId) => {
    
  const url = `${process.env.REACT_APP_API_PATH}api/artworkSave`;
  const body = { uri: image, userId: userId };
  
  const storedImageUrl = await axios.post(url, body)
  .then((res) => { return res })
  .catch((error) => console.error('Error: ', error));

  return storedImageUrl;
};

export { storeImagesInCloudinary };