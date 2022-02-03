const Router = require("express");

const postController = require("../controllers/postController");

const router = new Router();

router.post("/createPost", postController.createPost);
router.patch("/updatePost/:id", postController.updatePost);
router.get("/viewAllPosts", postController.getAllPosts);
router.get("/viewPost/:id", postController.getOnePost);
router.delete("/deletePost/:id", postController.deletePost);

module.exports = router;
