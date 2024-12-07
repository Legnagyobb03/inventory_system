const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String},
  quantity: { type: Number, required: true },
  location: {type: String, enum:["Section A", "Section B", "Section C", "Section D"], default:"Undefined"}
});

module.exports = mongoose.model('Item', itemSchema);