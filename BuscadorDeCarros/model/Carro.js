const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Carro = new Schema({
  marca: {
    type: String
  },
  modelo: {
    type: String
  },
  ano: {
    type: Number
  },
  motor: {
    type: String
  },
  preco: {
    type: Number
  },
  imagem: {
    type: String
  }
}, {
    collection: 'carro'
});

module.exports = mongoose.model('Carro', Carro);