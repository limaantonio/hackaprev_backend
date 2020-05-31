const mongoose = require('mongoose');

const AssociacaoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },

  categoria: {
    type: String,
    required: true
  },
  
  endereco: {
    type: String,
    required: true,
  },

  cidade: {
    type: String,
    required: true,
  },

  telefone: {
    type: String,
    required: true,
  },

  user_responsavel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now()
  }

});


module.exports = mongoose.model('Associacao', AssociacaoSchema);
