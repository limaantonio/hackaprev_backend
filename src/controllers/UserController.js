const User = require('../models/User');

module.exports = {
  async index (request, response){
    try{
      const users = await User.find();
      
      return response.send({users})
    }catch(err){
      return response.status(400).send({error: 'Error loading users.'})
    }
  },

  async deleteById (request, response){
    try{
      const user = await User.findOneAndRemove(request.params.userId);
      
      return response.send();
    }catch(err){
      return response.status(400).send({error: 'Error deleting user.'})
    }
  },

  async updateById (request, response){
    const {id} = request.params;
    const {nome, idade, sexo, endereco, cidade, ocupacao} = request.body;

    try{
      const user  = await User.findByIdAndUpdate(id, {
        nome: nome,
        idade: idade,
        sexo: sexo,
        endereco: endereco,
        cidade: cidade,
        ocupacao: ocupacao,
  
      });

      return response.status(204).send();
    }catch(e){
      return response.status(400).json({error: 'No user found with this ID'});
    }
  },

  async create (request, response){
    try{
      const user = await User.create(request.body);

      return response.status(201).json(user);

    }catch(err){
      return response.status(400).send({error: 'Error creating new User'})

    }
  }
}