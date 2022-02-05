const { Comment } = require("../models/commentModel");
const {where} = require("sequelize");

class CommentController {
  async createComment(req, res) {
    const { content, userId, postId } = req.body;
    const comment = await Comment.create({
      content,
      userId,
      postId,
    });
    return res.json(comment);
  }

  async getAllComments(req, res) {
    const comment = await Comment.findAll();
    return res.json(comment);
  }

  async getOneComment(req, res) {
    const { id } = req.params;
    const comment = await Comment.findOne({ where: { id } });
    return res.json(comment);
  }

  async updateComment(req, res) {
    const { id, content } = req.body;
    const comment = await Comment.update({ content }, { where: { id } });
    return res.json(comment);
  }

  async deleteComment(req, res) {
    const { id } = req.params;
    const comment = await Comment.destroy({ where: { id } });
    return res.json(comment);
  }
}

module.exports = new CommentController();
