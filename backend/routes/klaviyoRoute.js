import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';
import fetch from 'node-fetch';

const router = express();
dotenv.config();

export const formatDate = () => {
  const date = new Date();
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  const localISOTime = (new Date(Date.now() - timezoneOffset)).toISOString().slice(0,-1);
  return localISOTime;
};

router.post("/addProfile", async (req, res) => {
  
  const { email } = req.body;

  const createProfileUrl = 'https://a.klaviyo.com/api/profiles/';

  try{
    const options = {
      headers: {
        accept: 'application/json',
        revision: '2024-02-15',
        'content-type': 'application/json',
        Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_API_KEY}`
      }
    };

    const createProfileData = {
      data: {
        type: 'profile',
        attributes: {
          email: email
        }
      }
    };

    await axios.post(
      createProfileUrl, 
      createProfileData,
      options
    )
    .then((response) => {
      console.log('data', response.data)
      res.status(200).send({data: response.data})
    })
    .catch((error) => {
      if(error?.response?.data?.errors[0].code === 'duplicate_profile'){
        res.status(201).send({id: error?.response?.data?.errors[0]?.meta?.duplicate_profile_id});
      } else {
        res.status(400).send({error: error?.response?.data?.errors[0]});
      }
    })

  } catch (error){
    res.status(500).send(error);
  }
});

router.post("/subscribe", async (req, res) => {
  
  const { email, id } = req.body;

  const url = 'https://a.klaviyo.com/api/lists/XRWRSR/relationships/profiles/';

  try{
    const options = {
      headers: {
        accept: 'application/json',
        revision: '2024-02-15',
        'content-type': 'application/json',
        Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_API_KEY}`
      }
    };

    const data = [{ type: 'profile', id: id }]
    

    await axios.post(url, { data: data }, options)
    .then(response => {
      if(response.status === 204){
        res.status(204).send({data: 'Success'})
      } else {
        res.status(400).send({data: 'Fail'})
      }
    })
    .catch(err => res.send({error: err }));


  } catch (error){
    
    res.status(500).send(error);
  }
});

export default router;