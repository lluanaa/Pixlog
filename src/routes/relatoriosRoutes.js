const express = require('express');
const { criarRelatorio, arquivarRelatorio, desarquivarRelatorio, listarRelatorios } = require('../controllers/relatoriosController');
const routes = express.Router();

routes.post('/', criarRelatorio);
routes.get('/', listarRelatorios);
routes.put('/arquivar/:id', arquivarRelatorio);
routes.put('/desarquivar/:id', desarquivarRelatorio);

module.exports = routes;