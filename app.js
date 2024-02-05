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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "public" and "/uploads" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// Routes
const artRoutes = require('./routes/artRoutes');
app.use('/art', artRoutes);

// Default route to server static files.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
