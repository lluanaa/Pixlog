const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Empresa = require('./empresa');

const Operador = sequelize.define('Operador', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    empresa_associada: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true,
        },
    },
}, {
    tableName: 'operadores',
    timestamps: true,
});

Operador.belongsTo(Empresa, {
    foreignKey: 'empresa_associada',
    targetKey: 'id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});

module.exports = Operador;
