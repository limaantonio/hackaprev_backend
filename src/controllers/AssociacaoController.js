const User = require('../models/User');
const Associcao = require('../models/Associacao');

module.exports = {

  async index(request, response){
      try{
        const associacoes = await Associcao.find();
        
        return response.send({associacoes})
      }catch(err){
        return response.status(400).send({error: 'Error loading users.'})
      }
  },

  async indexById(request, response){
    response.send({user: request.userID});
  },

  async create (request, response){
    try{
      const associacao = await Associcao.create({...request.body,  user_responsavel: request.userId} );

       return response.send({associacao});

    }catch(err){
      return response.status(400).send({error: 'Error creating new Associacao'})

    }
  }
}