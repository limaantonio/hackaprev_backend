const User = require('../models/User');
const Associcao = require('../models/Associacao');

module.exports = {

  async index(request, response){
      try{
        const associacoes = await Associcao.find().populate('user_responsavel');
        
        return response.send({associacoes})
      }catch(err){
        return response.status(400).send({error: 'Error loading users.'})
      }
  },

  async indexById(request, response){
    try{
      const associacao = await Associcao.findById(request.params.associcaoId).populate('user_responsavel');
      
      return response.send({associacao})
    }catch(err){
      return response.status(400).send({error: 'Error loading user.'})
    }
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