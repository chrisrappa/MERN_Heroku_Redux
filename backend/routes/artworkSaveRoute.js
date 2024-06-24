import express from 'express';
import * as dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import fetch from 'node-fetch';

const router = express.Router();
dotenv.config();

cloudinary.config({
  cloud_name: "djrbfvpit",
  api_key: "713115678661528",
  api_secret: "-HsfuTvU8PlvUzPCMnThsGWwVHQ"
});

router.post('/mockupBase64', async(req, res) => {

  try{

    const tempMockupUrl = req?.body?.mockupUrl;
    const imageRes = await fetch(tempMockupUrl)
    .then((res) => { return res })
    .catch((error) => console.log('Error: ', error));

    const imageBuffer = await imageRes.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');

    res.send(base64Image);

  } catch(err){
    console.error('Error: ', err);
  }
});

router.post("/", async (req, res) => {

  const response = cloudinary.uploader.upload(req.body.uri, {
    folder: `TempTatAI`
  });

  // Do further research later to see if we can upscale with cloudinary
  // const upscaledres = cloudinary.uploader.upload(
  //   req.body.uri,
  //   {
  //     public_id:'test',
  //     eager: [
  //       { effect: "upscale"           },
  //       { width: "4.0", crop: "scale" }
  //     ]
  //   }
  // );


  // console.log('upscaledres', upscaledres);

  await response.then((data) => {
    res.send(data.secure_url);
  })
  .catch((err) => {
    console.error('error', err);
    res.send(err);
  });
});

export default router;