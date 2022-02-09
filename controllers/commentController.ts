export {};

const { Comment } = require("../models/commentModel");
const ApiError = require("../error/ApiError");

class CommentController {
  async createComment(
    req: { body: { content: string; userId: number; postId: number } },
    res: { json: (arg0: any) => any }
  ) {
    const { content, userId, postId } = req.body;
    const comment = await Comment.create({
      content,
      userId,
      postId,
    });
    return res.json(comment);
  }

  async getAllComments(req: any, res: { json: (arg0: any) => any }) {
    const comment = await Comment.findAll();
    return res.json(comment);
  }

  async getOneComment(
    req: { params: { id: string } },
    res: { json: (arg0: any) => any },
    next: (arg0: unknown) => void
  ) {
    const { id } = req.params;
    const comment = await Comment.findOne({ where: { id } });
    if (!comment) {
      return next(ApiError.badRequest("Комментарий не найден"));
    }
    return res.json(comment);
  }

  async updateComment(
    req: { body: { id: number; content: string } },
    res: { json: (arg0: any) => any }
  ) {
    const { id, content } = req.body;
    const comment = await Comment.update({ content }, { where: { id } });
    return res.json(comment);
  }

  async deleteComment(
    req: { params: { id: string } },
    res: { json: (arg0: any) => any },
    next: (arg0: unknown) => void
  ) {
    const { id } = req.params;
    const comment = await Comment.destroy({ where: { id } });
    if (!comment) {
      return next(ApiError.badRequest("Комментарий не найден"));
    }
    return res.json(comment);
  }
}

module.exports = new CommentController();
