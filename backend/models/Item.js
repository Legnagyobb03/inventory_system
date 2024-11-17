const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);