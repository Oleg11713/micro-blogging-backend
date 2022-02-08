export {};

const Router = require("express");

const commentController = require("../controllers/commentController");

const router = new Router();

router.post("/createComment", commentController.createComment);
router.patch("/updateComment", commentController.updateComment);
router.get("/viewAllComments", commentController.getAllComments);
router.get("/viewComment/:id", commentController.getOneComment);
router.delete("/deleteComment/:id", commentController.deleteComment);

module.exports = router;
