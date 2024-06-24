import express from 'express';
import Order from '../models/orderModel.js';

const router = express();

router.get("/orders", async (req, res) => {

  try{
    const orders = await Order.find({});

    res.status(200).json(orders ?? {});
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;