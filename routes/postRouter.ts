export {};

const Router = require("express");

const postController = require("../controllers/postController");

const router = new Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PostAllInfo:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: Автоматически генерируемый id поста
 *         title:
 *           type: string
 *           description: Оглавление поста
 *         content:
 *           type: string
 *           description: Основной текст поста
 *         img:
 *           type: object
 *           description: Картинка
 *         userId:
 *           type: integer
 *           description: Id пользователя, которому принадлежит пост
 *       example:
 *         id: 1
 *         title: Рандомное оглавление
 *         content: Часто бывает так, что смысл текста не имеет большого значения
 *         img: 9782cfe6-f1dc-4f4c-9e63-8bcb853beeff.jpg
 *         UserId: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PostCreate:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - UserId
 *       properties:
 *         title:
 *           type: string
 *           description: Оглавление поста
 *         content:
 *           type: string
 *           description: Основной текст поста
 *         img:
 *           type: string
 *           description: Картинка
 *         userId:
 *           type: integer
 *           description: Id пользователя, которому принадлежит пост
 *       example:
 *         title: Рандомное оглавление
 *         content: Часто бывает так, что смысл текста не имеет большого значения
 *         img: 9782cfe6-f1dc-4f4c-9e63-8bcb853beeff.jpg
 *         UserId: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PostUpdate:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: Оглавление поста
 *         content:
 *           type: string
 *           description: Основной текст поста
 *         img:
 *           type: string
 *           description: Картинка
 *       example:
 *         title: Рандомное оглавление
 *         content: Часто бывает так, что смысл текста не имеет большого значения
 *         img: 9782cfe6-f1dc-4f4c-9e63-8bcb853beeff.jpg
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Запросы, управляющие постами
 */

/**
 * @swagger
 * /post/createPost:
 *   post:
 *     summary: Создать новый пост
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostCreate'
 *     responses:
 *       200:
 *         description: Пост был успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostAllInfo'
 *       500:
 *         description: Непредвиденная ошибка
 */

router.post("/createPost", postController.createPost);

/**
 * @swagger
 * /post/updatePost:
 *  patch:
 *    summary: Обновить пост
 *    tags: [Posts]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostUpdate'
 *    responses:
 *      200:
 *        description: Пост был изменён
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostAllInfo'
 *      500:
 *        description: Непредвиденная ошибка
 */

router.patch("/updatePost", postController.updatePost);

/**
 * @swagger
 * /post/viewAllPosts:
 *   get:
 *     summary: Показать все имеющиеся посты
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Список постов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PostAllInfo'
 */

router.get("/viewAllPosts", postController.getAllPosts);

/**
 * @swagger
 * /post/viewPost/{id}:
 *   get:
 *     summary: Получить пост по id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id поста
 *     responses:
 *       200:
 *         description: Пост успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostAllInfo'
 *       404:
 *         description: Пост не найден
 */

router.get("/viewPost/:id", postController.getOnePost);

/**
 * @swagger
 * /post/deletePost/{id}:
 *   delete:
 *     summary: Удалить пост по id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id поста
 *     responses:
 *       200:
 *         description: Пост был удалён
 *       404:
 *         description: Пост не найден
 */

router.delete("/deletePost/:id", postController.deletePost);

module.exports = router;
