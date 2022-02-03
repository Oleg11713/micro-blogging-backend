const { Post } = require("../models/postModel");

class PostController {
  async createPost(req, res) {
    const { title, content, userId } = req.body;
    const post = await Post.create({
      title,
      content,
      userId,
    });
    return res.json(post);
  }

  async getAllPosts(req, res) {
    const post = await Post.findAll();
    return res.json(post);
  }

  async getOnePost(req, res) {
    const { id } = req.params;
    const post = await Post.findOne({ where: { id } });
    return res.json(post);
  }

  async updatePost(req, res) {
    const { id } = req.params;
    const updatedPost = req.body;
    console.log(updatedPost);
    const post = await Post.update(updatedPost, { where: { id } });
    return res.json(post);
  }

  async deletePost(req, res) {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    await post.destroy();
    return res.json(post);
  }
}

module.exports = new PostController();
