import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import axios from 'axios';

const router = express();
dotenv.config();

router.post("/", async (req, res) => {

  const imageUrl = req.body.imageUrl;

  const getUpscaleIdForImage = async() => {
    return await axios.post(
      'https://bigjpg.com/api/task/',
      {
        style: 'art',
        noise: '-1',
        x2: '2',
        input: imageUrl
      },
      { headers: { 'X-API-KEY': 'ff64b22ba6fc469593de02f661814447' } }
    );
  };

  try{
    const upscaleImageResponse = await getUpscaleIdForImage();

    res.status(200).send(upscaleImageResponse?.data?.tid);
  } catch(error) {
    res.status(500).send(error);
  }
});

router.post("/retrieveJob", async (req, res) => {

  const jobId = req.body.jobId;
  var requestOptions = {
    headers: {
      "X-API-KEY": "ff64b22ba6fc469593de02f661814447"
    },
  };

  console.log('job id', jobId);

  if(jobId){
    try {
      let response = await axios.get(`https://bigjpg.com/api/task/${jobId}`, requestOptions);
  
      if(response.data[req.body.jobId].status === 'success'){
        const imageURLRes = await fetch(response.data[jobId].url);
        const imageBuffer = await imageURLRes.arrayBuffer();
        const base64Image = Buffer.from(imageBuffer).toString('base64');
        
        res.send({upscaledImage: `data:image/png;base64,${base64Image}`, status: 'success', message: 'Job complete'});
      };
      
      if(response.data[jobId].status === 'process' || response.data[jobId].status === 'new'){
        res.send({ message: 'Job not complete ', status: 'processing'});
      };
  
      if(response.data[jobId].status === 'error'){
        console.log('error runs')
        res.send({ message: 'Error upscaling', status: 'error', error: response.data[jobId]})
      };
    } catch (error) {
      res.send({error: error, status: 'error' });
    }
  }
});



export default router;