const mongoose = require('mongoose');

const ItemsSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  priodade: {
    type: String,
    required: true,
  },
  situacao: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model('Item', ItemsSchema);
module.exports = Item;