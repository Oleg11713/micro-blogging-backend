export {};

const { Post } = require("../models/postModel");

class PostController {
  async createPost(
    req: { body: { title: string; content: string; userId: number } },
    res: { json: (arg0: any) => any }
  ) {
    const { title, content, userId } = req.body;
    const post = await Post.create({
      title,
      content,
      userId,
    });
    return res.json(post);
  }

  async getAllPosts(req: any, res: { json: (arg0: any) => any }) {
    const post = await Post.findAll();
    return res.json(post);
  }

  async getOnePost(
    req: { params: { id: string } },
    res: { json: (arg0: any) => any }
  ) {
    const { id } = req.params;
    const post = await Post.findOne({ where: { id } });
    return res.json(post);
  }

  async updatePost(
    req: { body: { id: number; title: string; content: string } },
    res: { json: (arg0: any) => any }
  ) {
    const { id, title, content } = req.body;
    const post = await Post.update({ title, content }, { where: { id } });
    return res.json(post);
  }

  async deletePost(
    req: { params: { id: string } },
    res: { json: (arg0: any) => any }
  ) {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    await post.destroy();
    return res.json(post);
  }
}

module.exports = new PostController();
