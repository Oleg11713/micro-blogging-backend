export {};

const uuid = require("uuid");
const path = require("path");

const ApiError = require("../error/ApiError");
const { Post } = require("../models/postModel");

class PostController {
  async createPost(
    req: {
      body: { title: string; content: string; userId: number };
      files: { images: [] | any };
    },
    res: { json: (arg0: any) => any }
  ) {
    const { title, content, userId } = req.body;
    let fileNames: any = {};
    let i = 0;
    if (req.files) {
      const { images } = req.files;
      if (Array.isArray(images)) {
        images.map((image: { mv: (arg0: any) => any }) => {
          const fileName = uuid.v4() + ".jpg";
          image.mv(path.resolve(__dirname, "..", "static", fileName));
          fileNames[i] = fileName;
          i++;
        });
      } else {
        fileNames[0] = uuid.v4() + ".jpg";
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
      body: { id: number; title: string; content: string; uploadedImages: [] };
      files: { newImages: [] | any };
    },
    res: { json: (arg0: any) => any }
  ) {
    const { id, title, content, uploadedImages } = req.body;
    let fileNames: any = {};
    let i = 0;
    if (req.files) {
      const { newImages } = req.files;
      if (Array.isArray(newImages)) {
        newImages.map((image: { mv: (arg0: any) => any }) => {
          const fileName = uuid.v4() + ".jpg";
          image.mv(path.resolve(__dirname, "..", "static", fileName));
          fileNames[i] = fileName;
          i++;
        });
      } else {
        fileNames[i] = uuid.v4() + ".jpg";
        newImages.mv(path.resolve(__dirname, "..", "static", fileNames[0]));
        i++;
      }
    }
    if (uploadedImages) {
      if (Array.isArray(uploadedImages)) {
        uploadedImages.map((image) => {
          fileNames[i] = image;
          i++;
        });
      } else {
        fileNames[i] = uploadedImages;
        i++;
      }
    }
    const post = await Post.update(
      { title, content, images: fileNames },
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
