const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../../config/database');
const Empresa = require('./empresa');
const Operador = require('./Operador');

const Relatorio = sequelize.define('Relatorio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    empresa_associada: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    operador: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    data_criacao: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    data_atualizacao: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
            if (value === undefined || value === null) {
                this.setDataValue('status', 'Não Arquivado');
            } else {
                const normalizedValue = value.toLowerCase() === 'arquivado' ? 'Arquivado' : 'Não Arquivado';
                this.setDataValue('status', normalizedValue);
            }
        }
    },
    volume: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    horario: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    comprimento: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    info_adicional: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'relatorios',
    timestamps: true,
    createdAt: 'data_criacao',
    updatedAt: 'data_atualizacao',
});

Relatorio.belongsTo(Empresa, {
    foreignKey: 'empresa_associada',
    targetKey: 'id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    as: 'Empresa',
});

Relatorio.belongsTo(Operador, {
    foreignKey: 'operador',
    targetKey: 'id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    as: 'Operador',
});

Empresa.hasMany(Relatorio, { foreignKey: 'empresa_associada' });
Operador.hasMany(Relatorio, { foreignKey: 'operador' });

module.exports = Relatorio;