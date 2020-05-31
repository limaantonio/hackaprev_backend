const express = require('express');

const UserController = require('./controllers/UserController');
const AssociacaoController = require('./controllers/AssociacaoController');
const authController = require('./controllers/authController');
const authMiddleware = require('../src/middlewares/auth');

const routes = express.Router();



routes.post('/register', authController.register);

routes.post('/authenticate', authController.authenticate);

routes.post('/forgot_password', authController.forgot_password);

routes.post('/reset_password', authController.reset_password);

routes.get('/users', UserController.index);
routes.delete('/users/:id', UserController.deleteById);
routes.put('/users/:id', UserController.updateById);
routes.post('/users', UserController.create);

//routes.get('/:associcaoId', AssociacaoController.indexById);
routes.get('/associacao',  authMiddleware, AssociacaoController.index);
routes.post('/associacao', authMiddleware, AssociacaoController.create);


module.exports = routes;