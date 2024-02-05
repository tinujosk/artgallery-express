const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const databaseName = 'art_gallery';
const mongoPassword = 'mongoCluster0';

// Connect to MongoDB on the cloud with the connections string, password and databaseName
mongoose.connect(
  `mongodb+srv://tinujosk:${mongoPassword}@cluster0.w5scobe.mongodb.net/${databaseName}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Middleware to enable CORS
app.use((req, res, next) => {
  // Allow requests from any origin (you can specify a specific origin if needed)
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Allow these HTTP methods
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Allow these headers to be sent with the request
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Allow credentials (if needed)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Handle preflight requests (OPTIONS method)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  // Continue to the next middleware
  next();
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const artRoutes = require('./routes/artRoutes');
app.use('/art', artRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
