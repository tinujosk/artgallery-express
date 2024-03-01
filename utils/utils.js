const Art = require('../models/Art');

async function updateQuantity(artId, newQuantity) {
  console.log('checking inside update');
  try {
    const updatedArt = await Art.findOneAndUpdate(
      { _id: artId },
      { $inc: { quantity: -newQuantity } },
      { new: true }
    );
    if (!updatedArt) {
      throw new Error('Art item not found');
    }
    console.log('Art item updated successfully:', updatedArt);
    return updatedArt;
  } catch (error) {
    console.error('Error updating art item:', error.message);
    return null;
  }
}

module.exports = { updateQuantity };
