const Empresa = require('../models/empresa');
const Sequelize = require('sequelize');

exports.criarEmpresa = async (req, res) => {
     try {
          const { nome, cnpj, endereco, telefone, email } = req.body;

          if (!nome || !cnpj) {
               return res.status(400).json({ message: 'Os campos Nome e CNPJ são obrigatórios' });
          }

          const { cnpj: cnpjValidator } = require('cpf-cnpj-validator');

          if (!cnpjValidator.isValid(cnpj)) {
               return res.status(400).json({ message: 'CNPJ inválido. Por favor, insira um CNPJ válido' });
          }

          const validator = require('validator');
          if (email && !validator.isEmail(email)) {
               return res.status(400).json({ message: 'E-mail inválido. Por favor, insira um e-mail válido' });
          }

          const novaEmpresa = await Empresa.create({
               nome,
               cnpj,
               endereco,
               telefone,
               email
          });

          res.status(201).json({ message: 'Empresa criada com sucesso', empresa: novaEmpresa });
     } catch (error) {
          if (error instanceof Sequelize.UniqueConstraintError) {
               return res.status(400).json({ message: 'Já existe uma empresa com esse nome. Por favor, escolha outro nome.' });
          }
          res.status(500).json({ message: 'Erro ao criar empresa', error: error.message });
     }
}

exports.updateEmpresa = async (req, res) => {
     try {
          const { id } = req.params;
          const { nome, cnpj, endereco, telefone, email } = req.body;

          const empresa = await Empresa.findByPk(id);

          if (!empresa) {
               return res.status(404).json({ message: 'Empresa não encontrada' });
          }

          await empresa.update({
               nome,
               cnpj,
               endereco,
               telefone,
               email,
          });

          return res.status(200).json({
               message: 'Empresa atualizada com sucesso',
               empresa
          });
     } catch (error) {
          // Caso ocorra erro de duplicadade com outra empresa, retorna mensagem de erro
          if (error instanceof Sequelize.UniqueConstraintError) {
               const duplicateField = error.errors[0]?.path;
               const errorMessage =
                    duplicateField === 'nome'
                         ? 'Já existe outra empresa com esse nome. Por favor, escolha outro nome.'
                         : 'Já existe outra empresa com esse CNPJ. Por favor, escolha outro CNPJ.';
               return res.status(400).json({ message: errorMessage });
          }

          return res.status(500).json({ message: 'Erro ao atualizar empresa', error: error.message });
     }
};

exports.deleteEmpresa = async (req, res) => {
     try {
          const { id } = req.params;
          const resultado = await Empresa.destroy({ where: { id } });

          if (!resultado) {
               return res.status(404).json({ message: 'Empresa não encontrada' });
          }

          res.status(200).json({ message: `Empresa deletada com sucesso` });
     } catch (error) {
          res.status(500).json({ message: 'Erro ao deletar empresa', error: error.message });
     }
}

exports.getEmpresa = async (req, res) => {
     try {
          const { nome, cnpj } = req.query;
          const filtro = {};

          if (nome) filtro.nome = nome;
          if (cnpj) filtro.cnpj = cnpj;

          const empresas = await Empresa.findAll({ where: filtro });

          if (empresas.length === 0) {
               return res.status(404).json({ message: 'Nenhuma empresa encontrada' });
          }

          res.status(200).json(empresas);
     } catch (error) {
          res.status(500).json({ message: 'Erro ao buscar empresas', error: error.message });
     }
} 