'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Users",
        //   key: 'id'
        // }
      },
      trdate: {
        type: Sequelize.DATE
      },
      monthyear: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      fromaccount: {
        type: Sequelize.STRING
      },
      toaccount: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      receipt: {
        type: Sequelize.TEXT('long')
      },
      notes: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};