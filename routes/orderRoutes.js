const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { updateQuantity } = require('../utils/utils');

router.post('/add', async (req, res) => {
  const order = new Order({
    user: req.body.user,
    product: req.body.product,
    quantity: req.body.quantity,
  });

  try {
    const newOrder = await order.save();
    await updateQuantity(req.body.product, req.body.quantity);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/all/:id', async (req, res) => {
  try {
    const user = req.params.id;
    const allOrders = await Order.find({ user });
    // const latestArt = await Art.find().sort({ createdAt: -1 }).limit(4);
    res.json(allOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const user = req.params.id;
    const allOrders = await Order.find();
    // const latestArt = await Art.find().sort({ createdAt: -1 }).limit(4);
    res.json(allOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
