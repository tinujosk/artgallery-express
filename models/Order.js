const mongoose = require('mongoose');

// This is the collection name configured in the mongoDB database.
const collectionName = 'order_details';

const Schema = mongoose.Schema;
// Creating the collection fields.
const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Art',
    required: true,
  },
  quantity: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema, collectionName);
