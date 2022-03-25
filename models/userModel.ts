import DataTypes from "sequelize";
const uuid = require("uuid");

const sequelize = require("../config/db");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  displayName: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
});

const ADMIN = {
  displayName: "Олег Овчинский",
  age: 19,
  email: "admin@mail.ru",
  password: "admin12345",
  role: "ADMIN",
  isActivated: true,
  activationLink: uuid.v4(),
};

module.exports = {
  User,
  ADMIN,
};
