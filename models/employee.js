'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
   
    static associate(models) {
      
    }
  }
  employee.init({
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    middlename: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    company_ID:{
      defaultValue:1,
      type: DataTypes.INTEGER
    },
    role_ID:{
      type: DataTypes.INTEGER
    },

  }, {
    sequelize,
    modelName: 'employee',
    timestamps:false
  });
  return employee;
};