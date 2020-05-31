const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  senha: {
    type: String,
    required: true,
    select: false
  },

  
  senhaResetToken: {
    type: String,
    select: false
  },


  senhaResetExpires: {
    type: Date,
    select: false
  },
  
  // idade: {
  //   type: Number,
  //   required: true
  // },
  
  // sexo: {
  //   type: String,
  //   required: true,
  // },

  // endereco: {
  //   type: String,
  //   required: true,
  // },

  // cidade: {
  //   type: String,
  //   required: true,
  // },

  // ocupacao: {
  //   type: String,
  //   required: true,
  // },

  // createdAt: {
  //   type: Date,
  //   default: Date.now()
  // }

});


UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;

  next();

})

module.exports = mongoose.model('User', UserSchema);
