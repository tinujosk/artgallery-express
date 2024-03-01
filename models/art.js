const mongoose = require('mongoose');

// This is the collection name configured in the mongoDB database.
const collectionName = 'art_details';

// Creating the collection fields.
const artSchema = new mongoose.Schema({
  title: { type: String, required: true, text: true },
  author: { type: String, required: true },
  year: { type: String, required: true },
  medium: { type: String, required: true },
  price: { type: Number, required: true },
  phone: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model('Art', artSchema, collectionName);
