// const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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

// Authentication system is in progress
// router.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   // Example authentication logic (replace with your actual logic)
//   if (username === 'admin' && password === 'password') {
//     const token = jwt.sign({ username: 'admin' }, 'your_secret_key', {
//       expiresIn: '1h',
//     });
//     res.json({ token });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });

// Authentication middleware
// function isAuthenticated(req, res, next) {
//   const token = req.headers.authorization;
//   if (!token) {
//     // return res
//     //   .status(401)
//     //   .json({ message: 'Unauthorized: Authentication token missing' });
//   }
//   // if (token !== 'your_authentication_token') {
//   //   return res
//   //     .status(401)
//   //     .json({ message: 'Unauthorized: Invalid authentication token' });
//   // }
//   next();
// }

// Protected route
// router.get('/protected', isAuthenticated, (req, res) => {
//   res.send('You have access to the protected resource');
// });

// Search Art
router.get('/search', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    // const results = await Art.find({ $text: { $search: keyword } }); // Use this for single record with exact name
    const results = await Art.find({
      title: { $regex: keyword, $options: 'i' },
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all Art entries
router.get('/all', async (req, res) => {
  try {
    // const allArt = await Art.find(); // This can be used to retrieve all art.
    const latestArt = await Art.find().sort({ createdAt: -1 }).limit(4);
    res.json(latestArt);
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

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedArt = await Art.findByIdAndDelete(id);
    if (!deletedArt) {
      return res.status(404).json({ message: 'Art not found' });
    }
    if (deletedArt.imageURL) {
      const imagePath = path.join(path.dirname(__dirname), deletedArt.imageURL);
      fs.unlinkSync(imagePath);
    }
    res.json({ message: 'Art deleted successfully', deletedArt });
  } catch (err) {
    console.error('Error deleting art:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
