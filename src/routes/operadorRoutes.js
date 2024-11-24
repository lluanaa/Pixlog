const express = require('express');
const { criarOperador, getOperador, updateOperador, deleteOperador, getAllOperadores } = require('../controllers/operadorController');
const routes = express.Router();

routes.post('/', criarOperador);
routes.get('/', getAllOperadores);
routes.get('/:id', getOperador);
routes.put('/:id', updateOperador);
routes.delete('/:id', deleteOperador);

module.exports = routes;
