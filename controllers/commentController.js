const { Comment } = require("../models/commentModel");

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
    const { id } = req.params;
    const updatedComment = req.body;
    await Comment.update(updatedComment, { where: { id } });
    return res.json(updatedComment);
  }

  async deleteComment(req, res) {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    await comment.destroy();
    return res.json(comment);
  }
}

module.exports = new CommentController();
