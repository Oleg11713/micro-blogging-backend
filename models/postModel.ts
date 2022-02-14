export {};

const { DataTypes } = require("sequelize");

const { User } = require("./userModel");
const sequelize = require("../config/db");

const Post = sequelize.define("posts", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.STRING, allowNull: false },
  images: { type: DataTypes.JSON },
});

User.hasMany(Post);
Post.belongsTo(User);

module.exports = {
  Post,
};
