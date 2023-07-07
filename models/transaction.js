'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Transaction.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'cascade' });
    }
  }
  Transaction.init({
    trdate: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    monthyear: DataTypes.STRING,
    type: DataTypes.STRING,
    fromaccount: DataTypes.STRING,
    toaccount: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    receipt: DataTypes.STRING,
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};