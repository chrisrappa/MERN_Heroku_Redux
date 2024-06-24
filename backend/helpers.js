import fetch from 'node-fetch';
import sharp from 'sharp';
import axios from 'axios';

export const getDataFromBlobs = async(blobCollection) => {
  const dataPromises = blobCollection.map(async(blob) => {
    const response = await axios.get(blob.url, { responseType: 'arraybuffer' });

    const buffer = Buffer.from(response.data, 'binary');
    const convertedBuffer = await sharp(buffer).png().toBuffer();

    return { url: `data:image/png;base64,${convertedBuffer.toString('base64')}` };
  });

  return Promise.all(dataPromises);
};