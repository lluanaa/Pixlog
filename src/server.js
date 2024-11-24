const express = require('express');
const sequelize = require('../config/database');
const empresaRouter = require('./routes/empresaRoutes');
const operadorRouter = require('./routes/operadorRoutes');
const relatorioRouter = require('./routes/relatoriosRoutes');

const app = express();
app.use(express.json());

sequelize.sync()
    .then(() => {
        console.log('Tabelas criadas com sucesso');
    })
    .catch((error) => {
        console.error('Erro ao criar tabelas:', error);
    });

app.use('/api/empresas', empresaRouter);
app.use('/api/operadores', operadorRouter);
app.use('/api/relatorios', relatorioRouter);

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});

module.exports = app;