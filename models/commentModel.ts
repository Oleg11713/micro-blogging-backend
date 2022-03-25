import DataTypes from "sequelize";

const { User } = require("./userModel");
const { Post } = require("./postModel");
const sequelize = require("../config/db");

const Comment = sequelize.define("comments", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.STRING, allowNull: false },
});

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

module.exports = {
  Comment,
};
