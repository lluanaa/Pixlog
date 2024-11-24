const express = require('express');
const app = express();

const empresaRouter = require('./routes/empresaRoutes');
const operadorRouter = require('./routes/operadorRoutes');
const relatorioRouter = require('./routes/relatoriosRoutes');

app.use('/empresa', empresaRouter);
app.use('/operador', operadorRouter);
app.use('/relatorio', relatorioRouter);

module.exports = app;
