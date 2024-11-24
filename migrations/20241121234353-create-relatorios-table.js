'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Relatorios', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      operadorId: {
        type: Sequelize.UUID,
        references: {
          model: 'Operadores',
          key: 'id',
        },
        allowNull: false,
      },
      volume: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      horario: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      comprimento: {
        type: Sequelize.FLOAT,
        allowNull: false, 
      },
      info_adicional: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('Arquivado', 'Não Arquivado'),
        allowNull: true,
        defaultValue: 'Não Arquivado',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Relatorios');
  }
};