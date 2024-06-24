import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import axios from 'axios';

const router = express();
dotenv.config();

router.post('/placeOrder', (req, res) => {
  
  const order = req.body;
  console.log('order', order);

  const requestOptions = {
    headers: {
      Authorization: `Bearer ${process.env.PRINTFUL_STORE_ACCESS_KEY}`,
      method: 'POST'
    }
  };

  const url = 'https://api.printful.com/orders';

  axios.post(url, order, requestOptions)
  .then((response) => {
    res.send(response.data);
  })
  .catch((error) => {
    console.log('error', error);
    res.send(error.message);
  })
});

router.post('/printfile', async(req, res) => {

  const productId = req.body.id;

  const url = `https://api.printful.com/mockup-generator/printfiles/${productId}`;
  const requestOptions = {
    method: 'GET',
    headers : {
      Authorization: `Bearer ${process.env.PRINTFUL_ACCESS_KEY}`,
    },
    redirect: 'follow'
  };

  fetch(url, requestOptions)
  .then(response => response.json())
  .then(result => res.send(result))
  .catch(error => console.error('error', error));
});

router.post('/estimateCost', async(req, res) => {
  const orderData = req.body;

  const url = 'https://api.printful.com/orders/estimate-costs'
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${process.env.PRINTFUL_STORE_ACCESS_KEY}`,
      method: 'POST'
    }
  };

  axios.post(url, orderData, requestOptions)
  .then((response) => {
    res.status(200).send(response?.data?.result);
  })
  .catch((error) => {
    res.status(500).send(error);
    console.error('error', error.data)
  })
});

router.post('/retrieveMockup/:id', async(req, res) => {
  const taskId = req.params.id;
  const requestOptions = {
    method: 'GET',
    headers : {
      Authorization: `Bearer ${process.env.PRINTFUL_ACCESS_KEY}`,
    },
  };

  const url = `https://api.printful.com/mockup-generator/task?task_key=${taskId}`;

  fetch(url, requestOptions)
  .then(response => response.json())
  .then(result => res.send(result))
  .catch(error => console.error('Error: ', error));
});

router.post('/:id', async(req, res) => {

  const productId = req.params.id;

  const requestOptions = {
    method: 'GET',
    authorization: `Bearer ${process.env.PRINTFUL_ACCESS_KEY}`,
    redirect: 'follow'
  };

  fetch(`https://api.printful.com/products/${productId}`, requestOptions)
  .then(response => response.json())
  .then(result => res.send(result))
  .catch(error => console.error('error', error));
  
});

router.get('/checkOrderStatus/:id', async(req, res) => {
  const printfulOrderId = req.params.id;
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${process.env.PRINTFUL_STORE_ACCESS_KEY}`,
      method: 'GET'
    }
  };

  try{
    fetch(`https://api.printful.com/orders/${printfulOrderId}`, requestOptions)
    .then(response => response.json())
    .then(data => res.status(200).send(data?.result))
    .catch(error => res.status(400).send(error));

  } catch (error) {
    res.status(500).send(error);
  };
});

router.get('/templates/:id', (req, res) => {
  const productId = req?.params?.id;

  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.PRINTFUL_STORE_ACCESS_KEY}`
    },
    redirect: 'follow'
  };

  fetch(`https://api.printful.com/mockup-generator/templates/${productId}`, requestOptions)
  .then((response) => response.json())
  .then((result)   => res.status(200).send(result))
  .catch((error)   => res.status(400).send(error) )
});


export default router;
