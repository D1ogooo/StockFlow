const mongoose = require('mongoose');

const ItemsSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  prioridade: {
    type: String,
    enum: ['baixa', 'media', 'alta'],
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
  },
  situacao: {
    type: String,
    enum: ['em-dia', 'em-falta'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model('Item', ItemsSchema);
module.exports = Item;