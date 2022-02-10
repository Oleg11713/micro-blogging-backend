export {};

const uuid = require("uuid");
const path = require("path");

const ApiError = require("../error/ApiError");
const { Post } = require("../models/postModel");

class PostController {
  async createPost(
    req: {
      body: { title: string; content: string; userId: number };
      files: { img: any };
    },
    res: { json: (arg0: any) => any }
  ) {
    const { title, content, userId } = req.body;
    let fileName = "";
    if (req.files) {
      const { img } = req.files;
      fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
    }
    const post = await Post.create({
      title,
      content,
      userId,
      img: fileName,
    });
    return res.json(post);
  }

  async getAllPosts(req: any, res: { json: (arg0: any) => any }) {
    const post = await Post.findAll();
    return res.json(post);
  }

  async getOnePost(
    req: { params: { id: string } },
    res: { json: (arg0: any) => any },
    next: (arg0: unknown) => void
  ) {
    const { id } = req.params;
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return next(ApiError.badRequest("Пост не найден"));
    }
    return res.json(post);
  }

  async updatePost(
    req: {
      body: { id: number; title: string; content: string };
      files: { img: any };
    },
    res: { json: (arg0: any) => any }
  ) {
    const { id, title, content } = req.body;
    let fileName = "";
    if (req.files) {
      const { img } = req.files;
      fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
    }
    const post = await Post.update(
      { title, content, img: fileName },
      { where: { id } }
    );
    return res.json(post);
  }

  async deletePost(
    req: { params: { id: string } },
    res: { json: (arg0: any) => any },
    next: (arg0: unknown) => void
  ) {
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
