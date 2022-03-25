import { Request, Response, NextFunction } from "express";
const { Comment } = require("../models/commentModel");
const ApiError = require("../error/ApiError");

interface ICommentRequest extends Request {
  body: {
    id: number;
    content: string;
    userId: number;
    postId: number;
  };
}

class CommentController {
  async createComment(req: ICommentRequest, res: Response) {
    const { content, userId, postId } = req.body;
    const comment = await Comment.create({
      content,
      userId,
      postId,
    });
    return res.json(comment);
  }

  async getAllComments(req: ICommentRequest, res: Response) {
    const comment = await Comment.findAll();
    return res.json(comment);
  }

  async getOneComment(req: ICommentRequest, res: Response, next: NextFunction) {
    const { id } = req.params;
    const comment = await Comment.findOne({ where: { id } });
    if (!comment) {
      return next(ApiError.badRequest("Комментарий не найден"));
    }
    return res.json(comment);
  }

  async updateComment(req: ICommentRequest, res: Response) {
    const { id, content } = req.body;
    const comment = await Comment.update({ content }, { where: { id } });
    return res.json(comment);
  }

  async deleteComment(req: ICommentRequest, res: Response, next: NextFunction) {
    const { id } = req.params;
    const comment = await Comment.destroy({ where: { id } });
    if (!comment) {
      return next(ApiError.badRequest("Комментарий не найден"));
    }
    return res.json(comment);
  }
}

module.exports = new CommentController();
