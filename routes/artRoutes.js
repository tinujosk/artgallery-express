const express = require('express');
const router = express.Router();
const Art = require('../models/art');

// Search Art
router.get('/search', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const results = await Art.find({ $text: { $search: keyword } });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Art (Admin Only)
router.post('/add', async (req, res) => {
  const art = new Art({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    year: req.body.year,
    medium: req.body.medium,
  });

  try {
    const newArt = await art.save();
    res.status(201).json(newArt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
