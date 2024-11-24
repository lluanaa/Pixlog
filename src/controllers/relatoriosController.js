const { Op } = require('sequelize');
const Relatorio = require('../models/Relatorios');
const Operador = require('../models/Operador');
const Empresa = require('../models/empresa');

exports.criarRelatorio = async (req, res) => {
     try {
          const {
               titulo,
               empresa_associada,
               operador,
               data_criacao,
               data_atualizacao,
               status,
               volume,
               horario,
               comprimento,
               info_adicional
          } = req.body;

          if (!volume || !horario || !comprimento || !operador) {
               return res.status(400).json({ message: 'Os campos operador, volume, horário e comprimento são obrigatórios. Por favor, preencha-os corretamente.' });
          }

          let empresaId;
          let operadorId;

          if (isNaN(empresa_associada)) {
               const empresa = await Empresa.findOne({ where: { nome: empresa_associada } });
               if (!empresa) {
                    return res.status(400).json({ message: 'Empresa não encontrada' });
               }
               empresaId = empresa.id;
          } else {
               empresaId = empresa_associada;
          }

          if (isNaN(operador)) {
               const operadorData = await Operador.findOne({ where: { nome: operador } });
               if (!operadorData) {
                    return res.status(400).json({ message: 'Operador não encontrado' });
               }
               operadorId = operadorData.id;
          } else {
               operadorId = operador;
          }

          const relatorio = await Relatorio.create({
               operador: operadorId,
               titulo,
               empresa_associada: empresaId,
               data_criacao,
               data_atualizacao,
               status,
               volume,
               horario,
               comprimento,
               info_adicional
          });

          const empresa = await Empresa.findByPk(relatorio.empresa_associada);
          const operadorData = await Operador.findByPk(relatorio.operador);

          return res.status(201).json({
               message: 'Relatório criado com sucesso!',
               id: relatorio.id,
               titulo: relatorio.titulo,
               operador: {
                    id: relatorio.operador,
                    nome: operadorData ? operadorData.nome : null,
               },
               empresa_associada: {
                    id: relatorio.empresa_associada,
                    nome: empresa ? empresa.nome : null,
               },
               data_criacao: relatorio.data_criacao,
               data_atualizacao: relatorio.data_atualizacao,
               status: relatorio.status,
               volume: relatorio.volume,
               horario: relatorio.horario,
               comprimento: relatorio.comprimento,
               info_adicional: relatorio.info_adicional
          });
     } catch (error) {
          return res.status(500).json({ message: 'Erro ao criar relatório', error });
     }
};


exports.listarRelatorios = async (req, res) => {
     try {
          const { operador, empresa, dataInicio, dataFim, status, page = 1, pageSize = 10, idEmpresa, nomeEmpresa } = req.query;
          const where = {};
          const operadorWhere = {};
          const empresaWhere = {};

          if (operador) {
               let operadorData = null;

               if (!isNaN(operador)) {
                    operadorData = await Operador.findOne({ where: { id: operador } });
               } else {
                    operadorData = await Operador.findOne({ where: { nome: operador } });
               }

               if (!operadorData) {
                    return res.status(404).json({ message: 'Operador não encontrado.' });
               }
               where.operador = operadorData.id;
          }

          if (empresa) {
               const empresaData = await Empresa.findOne({ where: { nome: empresa } });
               if (!empresaData) {
                    return res.status(404).json({ message: 'Empresa não encontrada.' });
               }
               where.empresa_associada = empresaData.id;
          }

          if (dataInicio && dataFim) {
               where.data_criacao = {
                    [Op.between]: [new Date(dataInicio), new Date(dataFim)],
               };
          } else if (dataInicio) {
               where.data_criacao = {
                    [Op.gte]: new Date(dataInicio),
               };
          } else if (dataFim) {
               where.data_criacao = {
                    [Op.lte]: new Date(dataFim),
               };
          }

          if (status) {
               where.status = status;
          }

          // Consultando os relatórios com filtros, paginação e inclusão de empresa e operador
          const relatorios = await Relatorio.findAndCountAll({
               where,
               include: [
                    {
                         model: Operador,
                         as: 'Operador',
                         attributes: ['id', 'nome'],
                         where: idEmpresa ? operadorWhere : null,
                    },
                    {
                         model: Empresa,
                         as: 'Empresa',
                         attributes: ['id', 'nome'],
                         where: idEmpresa || nomeEmpresa ? empresaWhere : null,
                    },
               ],
               limit: parseInt(pageSize),
               offset: (parseInt(page) - 1) * parseInt(pageSize),
               order: [['data_criacao', 'DESC']],
          });

          if (relatorios.count === 0) {
               return res.status(404).json({ message: 'Nenhum relatório encontrado para os filtros fornecidos.' });
          }

          if (relatorios.rows.some(relatorio => relatorio.status === 'Arquivado')) {
               return res.status(400).json({ message: 'Um ou mais relatórios estão arquivados e não podem ser retornados nesta pesquisa.' });
          }

          res.status(200).json({
               message: 'Relatórios listados com sucesso!',
               total: relatorios.count,
               totalPages: Math.ceil(relatorios.count / parseInt(pageSize)),
               currentPage: parseInt(page),
               relatorios: relatorios.rows,
          });
     } catch (error) {
          res.status(500).json({ message: 'Erro ao listar relatórios', error: error.message });
     }
};

exports.arquivarRelatorio = async (req, res) => {
     try {
          const { id } = req.params;
          const relatorio = await Relatorio.findByPk(id);

          if (!relatorio) {
               return res.status(404).json({ message: 'Relatório não encontrado' });
          }

          if (relatorio.status === 'Arquivado') {
               return res.status(400).json({ message: 'O relatório já está arquivado.' });
          }

          relatorio.status = 'Arquivado';
          await relatorio.save();

          res.status(200).json({ message: 'Relatório arquivado com sucesso', relatorio });
     } catch (error) {
          res.status(500).json({ message: 'Erro ao arquivar relatório', error: error.message });
     }
};

exports.desarquivarRelatorio = async (req, res) => {
     try {
          const { id } = req.params;
          const relatorio = await Relatorio.findByPk(id);

          if (!relatorio) {
               return res.status(404).json({ message: 'Relatório não encontrado' });
          }

          if (relatorio.status === 'Não Arquivado') {
               return res.status(400).json({ message: 'O relatório já está desarquivado.' });
          }

          relatorio.status = 'Não Arquivado';
          await relatorio.save();

          res.status(200).json({ message: 'Relatório desarquivado com sucesso', relatorio });
     } catch (error) {
          res.status(500).json({ message: 'Erro ao desarquivar relatório', error: error.message });
     }
};