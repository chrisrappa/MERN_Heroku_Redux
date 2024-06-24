import express from 'express';
import OpenAIApi from 'openai';
import * as dotenv from 'dotenv';
import { getDataFromBlobs } from '../helpers.js';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express();
dotenv.config();
// const configuration = new Configuration({
//   apiKey: process.env.OPEN_AI_ACCESS_KEY
// });
const openai = new OpenAIApi({apiKey: process.env.OPEN_AI_ACCESS_KEY});

// Set up the DALL-E endpoint
router.post("/", async (req, res) => {
  // Get the prompt from the request
  const { prompt } = req.body;

  // Generate image from prompt
  try{
    const response = await openai.images.generate({
      model: "dall-e-2",
      quality: "hd",
      prompt: prompt,
      n: 4,
      size: "1024x1024",
    });


    // Get image form URL and convert to base64
    const imagesCollection = response?.data;

    getDataFromBlobs(imagesCollection).then((collection) => {

      res.status(200).send({ collection });
    });

  } catch (error) {
    console.log(error.message)
  }

});

router.post("/variation", async (req, res) => {
  // I've been at this for hourse, tried everything, 
  // I can not get this to work no matter what, tabling for now.
  
  const { base64SourceImage } = req.body;
  
  const base64Data = base64SourceImage.replace(/^data:image\/png;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  buffer.name="sourceImage.png";

  try {

    const response = await openai.images.createVariation({
      model: "dall-e-2",
      image: buffer,
      n: 4,
      size: "1024x1024"
    });

  } catch (error) {
    console.log('error', error);
    res.status(500).send(error.message);
  }
});

export default router;