export {};

const Router = require("express");

const commentController = require("../controllers/commentController");

const router = new Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CommentAllInfo:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: Автоматически генерируемый id комментария
 *         content:
 *           type: string
 *           description: Основной текст комментария
 *         userId:
 *           type: integer
 *           description: Id пользователя, которому принадлежит комментарий
 *         postId:
 *           type: integer
 *           description: Id поста, под которым написан комментарий
 *       example:
 *         id: 1
 *         content: У тебя очень смешные посты, всегда приятно их читать
 *         UserId: 1
 *         PostId: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CommentCreate:
 *       type: object
 *       required:
 *         - content
 *         - UserId
 *         - PostId
 *       properties:
 *         content:
 *           type: string
 *           description: Основной текст комментария
 *         userId:
 *           type: integer
 *           description: Id пользователя, которому принадлежит комментарий
 *         postId:
 *           type: integer
 *           description: Id поста, под которым написан комментарий
 *       example:
 *         content: У тебя очень смешные посты, всегда приятно их читать
 *         UserId: 1
 *         PostId: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CommentUpdate:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *           description: Основной текст комментария
 *       example:
 *         content: У тебя очень смешные посты, всегда приятно их читать
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Запросы, управляющие комментариями
 */

/**
 * @swagger
 * /comment/createComment:
 *   post:
 *     summary: Создать новый комментарий
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentCreate'
 *     responses:
 *       200:
 *         description: Комментарий был успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentAllInfo'
 *       500:
 *         description: Непредвиденная ошибка
 */

router.post("/createComment", commentController.createComment);

/**
 * @swagger
 * /comment/updateComment:
 *  patch:
 *    summary: Обновить комментарий
 *    tags: [Comments]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CommentUpdate'
 *    responses:
 *      200:
 *        description: Комментарий был изменён
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CommentAllInfo'
 *      500:
 *        description: Непредвиденная ошибка
 */

router.patch("/updateComment", commentController.updateComment);

/**
 * @swagger
 * /comment/viewAllComments:
 *   get:
 *     summary: Показать все имеющиеся комментарии
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Список комментариев
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CommentAllInfo'
 */

router.get("/viewAllComments", commentController.getAllComments);

/**
 * @swagger
 * /comment/viewComment/{id}:
 *   get:
 *     summary: Получить комментарий по id
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id комментария
 *     responses:
 *       200:
 *         description: Комментарий успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentAllInfo'
 *       404:
 *         description: Комментарий не найден
 */

router.get("/viewComment/:id", commentController.getOneComment);

/**
 * @swagger
 * /comment/deleteComment/{id}:
 *   delete:
 *     summary: Удалить комментарий по id
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id комментария
 *
 *     responses:
 *       200:
 *         description: Комментарий был удалён
 *       404:
 *         description: Комментарий не найден
 */

router.delete("/deleteComment/:id", commentController.deleteComment);

module.exports = router;
