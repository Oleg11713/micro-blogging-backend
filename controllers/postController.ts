const uuid = require("uuid");
const path = require("path");
import { NextFunction, Request, Response } from "express";

const ApiError = require("../error/ApiError");
const { Post } = require("../models/postModel");

interface IPostRequest extends Request {
  body: {
    id: number;
    title: string;
    content: string;
    userId: number;
    uploadedImages: string[];
  };
  files: {
    images:
      | { mv: (arg0: object) => object }[]
      | { mv: (arg0: object) => object };
    newImages:
      | { mv: (arg0: object) => object }[]
      | { mv: (arg0: object) => object };
  };
}

class PostController {
  async createPost(req: IPostRequest, res: Response) {
    const { title, content, userId } = req.body;
    let fileNames: string[] = [];
    let i = 0;
    if (req.files) {
      const { images } = req.files;
      if (Array.isArray(images)) {
        images.map((image: { mv: (arg0: object) => object }) => {
          const fileName = uuid.v4() + ".jpg";
          image.mv(path.resolve(__dirname, "..", "static", fileName));
          fileNames.push(fileName);
          i++;
        });
      } else {
        fileNames.push(uuid.v4() + ".jpg");
        images.mv(path.resolve(__dirname, "..", "static", fileNames[0]));
      }
    }
    const post = await Post.create({
      title,
      content,
      userId,
      images: fileNames,
    });
    return res.json(post);
  }

  async getAllPosts(req: IPostRequest, res: Response) {
    const post = await Post.findAll();
    return res.json(post);
  }

  async getOnePost(req: IPostRequest, res: Response, next: NextFunction) {
    const { id } = req.params;
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return next(ApiError.badRequest("Пост не найден"));
    }
    return res.json(post);
  }

  async updatePost(req: IPostRequest, res: Response) {
    const { id, title, content, uploadedImages } = req.body;
    let fileNames: string[] = [];
    if (req.files) {
      const { newImages } = req.files;
      if (Array.isArray(newImages)) {
        newImages.map((image: { mv: (arg0: object) => object }) => {
          const fileName = uuid.v4() + ".jpg";
          image.mv(path.resolve(__dirname, "..", "static", fileName));
          fileNames.push(fileName);
        });
      } else {
        fileNames.push(uuid.v4() + ".jpg");
        newImages.mv(path.resolve(__dirname, "..", "static", fileNames[0]));
      }
    }
    if (uploadedImages) {
      if (Array.isArray(uploadedImages)) {
        uploadedImages.map((image: string) => {
          fileNames.push(image);
        });
      } else {
        fileNames.push(uploadedImages);
      }
    }
    const post = await Post.update(
      { title, content, images: fileNames },
      { where: { id } }
    );
    return res.json(post);
  }

  async deletePost(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      return next(ApiError.badRequest("Пост не найден"));
    }
    await post.destroy();
    return res.json(post);
  }
}

module.exports = new PostController();
