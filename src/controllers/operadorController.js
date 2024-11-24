const { Sequelize } = require('sequelize');
const Operador = require('../models/Operador');
const Empresa = require('../models/empresa');

exports.criarOperador = async (req, res) => {
    try {
        const { nome, cargo, empresa, telefone, email } = req.body;

        if (!nome || !cargo || !email) {
            return res.status(400).json({ message: 'Os campos nome, cargo e e-mail são obrigatórios.' });
        }

        let empresaId = null;

        if (empresa) {
            const empresaEncontrada = await Empresa.findOne({ where: { nome: empresa } });

            if (!empresaEncontrada) {
                return res.status(404).json({ message: 'Empresa associada não encontrada.' });
            }

            empresaId = empresaEncontrada.id;
        }

        const operador = await Operador.create({
            nome,
            cargo,
            empresa_associada: empresaId,
            telefone,
            email
        });

        const operadorComEmpresa = await Operador.findOne({
            where: { id: operador.id },
            include: [{
                model: Empresa,
                attributes: ['id', 'nome'],
            }]
        });

        return res.status(201).json({
            message: 'Operador criado com sucesso!',
            operador: {
                id: operadorComEmpresa.id,
                nome: operadorComEmpresa.nome,
                empresa: {
                    id: operadorComEmpresa.Empresa.id,
                    nome: operadorComEmpresa.Empresa.nome
                },
                cargo: operadorComEmpresa.cargo,
                telefone: operadorComEmpresa.telefone,
                email: operadorComEmpresa.email
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar operador.', error: error.message });
    }
}


exports.updateOperador = async (req, res) => {
    const { id } = req.params;
    const { nome, cargo, empresa, telefone, email } = req.body;

    try {
        const operador = await Operador.findByPk(id);

        if (!operador) {
            return res.status(404).json({ message: 'Operador não encontrado.' });
        }

        let empresaId = operador.empresa_associada;

        if (empresa) {
            const empresaEncontrada = await Empresa.findOne({ where: { nome: empresa } });

            if (!empresaEncontrada) {
                return res.status(404).json({ message: 'Empresa associada não encontrada.' });
            }

            empresaId = empresaEncontrada.id;
        }

        await operador.update({ nome, cargo, empresa_associada: empresaId, telefone, email });

        const operadorComEmpresa = await Operador.findOne({
            where: { id: operador.id },
            include: [{
                model: Empresa,
                attributes: ['id', 'nome'],
            }]
        });

        return res.status(200).json({
            message: 'Operador atualizado com sucesso.',
            operador: {
                id: operadorComEmpresa.id,
                nome: operadorComEmpresa.nome,
                empresa: {
                    id: operadorComEmpresa.Empresa.id,
                    nome: operadorComEmpresa.Empresa.nome
                },
                cargo: operadorComEmpresa.cargo,
                telefone: operadorComEmpresa.telefone,
                email: operadorComEmpresa.email
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar operador.', error: error.message });
    }
}


exports.deleteOperador = async (req, res) => {
    const { id } = req.params;
    try {
        const operador = await Operador.findByPk(id);

        if (!operador) {
            return res.status(404).json({ message: 'Operador não encontrado.' });
        }

        await operador.destroy();
        return res.status(200).json({ message: 'Operador deletado com sucesso!' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar operador', error: error.message });
    }
}

exports.getOperador = async (req, res) => {
    const { id } = req.params;

    try {
        const operador = await Operador.findOne({
            where: { id },
            include: [{
                model: Empresa,
                attributes: ['nome'],
            }]
        });

        if (!operador) {
            return res.status(404).json({ message: 'Operador não encontrado.' });
        }

        return res.status(200).json({
            message: 'Operador encontrado com sucesso.',
            operador
        });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar operador.', error: error.message });
    }
};


exports.getAllOperadores = async (req, res) => {
    try {
        const { nome, empresa, cargo } = req.query;

        const where = {};

        if (nome) {
            where.nome = nome;
        }

        if (empresa) {
            const empresaEncontrada = await Empresa.findOne({ where: { nome: empresa } });

            if (!empresaEncontrada) {
                return res.status(404).json({ message: 'Empresa não encontrada' });
            }

            where.empresa_associada = empresaEncontrada.id;
        }

        if (cargo) {
            where.cargo = cargo;
        }

        const operadores = await Operador.findAll({
            where,
            include: [{
                model: Empresa,
                attributes: ['id', 'nome'],
            }]
        });

        if (operadores.length === 0) {
            return res.status(404).json({ message: 'Nenhum operador encontrado' });
        }

        const operadoresFormatados = operadores.map(operador => ({
            id: operador.id,
            nome: operador.nome,
            empresa: {
                id: operador.Empresa.id,
                nome: operador.Empresa.nome
            },
            cargo: operador.cargo,
            telefone: operador.telefone,
            email: operador.email
        }));

        return res.status(200).json({
            message: 'Operadores encontrados com sucesso',
            operadores: operadoresFormatados
        });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar operadores', error: error.message });
    }
};


