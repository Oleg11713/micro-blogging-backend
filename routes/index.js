const Router = require("express");

const userRouter = require("./userRouter");
const commentRouter = require("./commentRouter");
const postRouter = require("./postRouter");

const router = new Router();

router.use("/user", userRouter);
router.use("/comment", commentRouter);
router.use("/post", postRouter);

module.exports = router;
