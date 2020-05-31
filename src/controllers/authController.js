const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mailer = require('../modules/mailer');

const authConfig = require('../config/auth.json');

function generateToken(params = {}){
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

module.exports = {

  async register (request, response){
    const {email} = request.body;

    try{
      if(await User.findOne({email})){
        return response.status(400).send({error: 'User already exists'})
      }
      const user = await User.create(request.body);

      user.senha = undefined;

      return response.send({
        user,
        token: generateToken({id: user.id})
        })
      
    }catch(err){
      return response.status(400).send({error : 'Registration failed'})
    }
   },

   async authenticate(request, response){
     
      const {email, senha} = request.body;

     const user = await User.findOne({email}).select('+senha');
     

     if(!user){
       return response.status(400).send({error: 'User not found'})
     }

     if(!await bcrypt.compare(senha, user.senha)){
      return response.status(400).send({error: 'Invalid password'})
     }

     user.senha = undefined;

     response.send({
       user,
      token: generateToken({id: user.id})
    })
   },

   async forgot_password(request, response){
     const {email} = request.body;

     try{
      const user = await User.findOne({email});

      if(!user)
        response.status(400).send({erro: 'User not found'});
      
        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
          '$set': {
            senhaResetToken: token,
            senhaResetExpires: now,
          }, 
        },{new: true, useFindAndModify: false});
        
        mailer.sendMail({
          to: email,
          from: 'antonio@gmail.com',
          template: 'auth/forgot_password',
          context: {token},
        }, (err) => {
          if(err){
            return response.status(400).send({error: 'Cannot send forgot password email.'});
          }
          return response.send();
        })

     }catch(err){
       response.status(400).send({error: 'Erro on forgot password, try again'});
     }
   },

   async reset_password(request, response){
     const {email, token, senha} = request.body;

     try{
      const user = await User.findOne({email}).select('+senhaResetToken passwordResetExperis');

      if(!user){
        return response.status(400).send({error: 'User not found'})
      }
      if(token !== user.senhaResetToken)
        return response.status(400).send({erros: 'Token invalid.'});

      const now = new Date();

      if(now > user.senhaResetExpires)
        return response.status(400).send({erros: 'Token expired.'});

      user.senha = senha;

      await user.save();

      response.send();
 
      
     }catch(err){
       response.send({error: 'Cannot reset password, try again.'})
     }
   }

}