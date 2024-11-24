const express = require('express');
const { criarEmpresa, updateEmpresa, deleteEmpresa, getEmpresa } = require('../controllers/empresaController');

const routes = express.Router();

routes.post('/', criarEmpresa);
routes.put('/:id', updateEmpresa);
routes.delete('/:id', deleteEmpresa);
routes.get('/', getEmpresa);

module.exports = routes;
