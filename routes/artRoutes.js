const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Art = require('../models/art');

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

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

// Get all Art entries
router.get('/all', async (req, res) => {
  try {
    const allArt = await Art.find();
    res.json(allArt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Art (Admin Only)
router.post('/add', upload.single('image'), async (req, res) => {
  const art = new Art({
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
    medium: req.body.medium,
    price: req.body.price,
    phone: req.body.phone,
    description: req.body.description,
    imageURL: `/uploads/${req.file?.filename}`,
  });

  try {
    const newArt = await art.save();
    res.status(201).json(newArt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
