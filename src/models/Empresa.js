const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Empresa = sequelize.define('Empresa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true
        }
    }
}, {
    tableName: 'empresas',
    timestamps: true
});

module.exports = Empresa;
