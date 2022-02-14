export {};

const Router = require("express");

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = new Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserAllInfo:
 *       type: object
 *       required:
 *         - displayName
 *         - age
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: Автоматически генерируемый id пользователя
 *         displayName:
 *           type: string
 *           description: Имя Фамилия пользователя
 *         age:
 *           type: integer
 *           description: Возраст пользователя
 *         email:
 *           type: string
 *           description: Почтовый адресс (требуется во время авторизации)
 *         password:
 *           type: string
 *           description: Пароль (требуется во время авторизации)
 *         role:
 *           type: string
 *           description: Роль пользователя
 *         isActivated:
 *           type: boolean
 *           description: Поле показывающее, подтвердил пользователь почту или нет
 *         activationLink:
 *           type: string
 *           description: Ссылка для активации аккаунта с почты
 *       example:
 *         id: 1
 *         displayName: Иван Иванов
 *         age: 20
 *         email: ivanov@mail.ru
 *         password: $2b$05$hZeVBlZrU3jY5zRaY41dD.dN/mmGIfJZJkZ1RU8VcoaNdd/jxMWNi (хэшированный пароль)
 *         role: USER
 *         isActivated: false
 *         activationLink: b2e1f92c-cbbd-4325-bf79-db545b361535
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegistration:
 *       type: object
 *       required:
 *         - displayName
 *         - age
 *         - email
 *         - password
 *       properties:
 *         displayName:
 *           type: string
 *           description: Имя Фамилия пользователя
 *         age:
 *           type: integer
 *           description: Возраст пользователя
 *         email:
 *           type: string
 *           description: Почтовый адресс (требуется во время авторизации)
 *         password:
 *           type: string
 *           description: Пароль (требуется во время авторизации)
 *       example:
 *         displayName: Иван Иванов
 *         age: 20
 *         email: ivanov@mail.ru
 *         password: 12345678
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Почтовый адресс (требуется во время авторизации)
 *         password:
 *           type: string
 *           description: Пароль (требуется во время авторизации)
 *       example:
 *         email: ivanov@mail.ru
 *         password: 12345678
 */


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Запросы, управляющие пользователями
 */

/**
 * @swagger
 * /user/registration:
 *   post:
 *     summary: Зарегистрировать нового пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       200:
 *         description: Пользователь успешно зарегистрирован
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAllInfo'
 *       500:
 *         description: Непредвиденная ошибка
 */

router.post("/registration", userController.registration);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Войти в аккаунт
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Пользователь успешно авторизован
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAllInfo'
 *       404:
 *         description: Пользователя с таким email не существует || Пользователь не подтвердил почту || Неверный пароль
 */

router.post("/login", userController.login);

/**
 * @swagger
 * /user/viewAllUsers:
 *   get:
 *     summary: Показать всех имеющихся пользователей
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserAllInfo'
 */

router.get("/viewAllUsers", userController.getAllUsers);

/**
 * @swagger
 * /user/viewUser/{id}:
 *   get:
 *     summary: Получить пользователя по id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id пользователя
 *     responses:
 *       200:
 *         description: Пользователь успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAllInfo'
 */

router.get("/viewUser/:id", userController.getOneUser);

/**
 * @swagger
 * /user/activate/{activationLink}:
 *   get:
 *     summary: Подтвердить аккаунт пользователя пройдя по ссылке
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: activationLink
 *         schema:
 *           type: string
 *         required: true
 *         description: ссылка пользователя
 *     responses:
 *       200:
 *         description: Пользователь успешно подтверждён
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAllInfo'
 *       404:
 *          description: Неккоректная ссылка активации
 */

router.get("/activate/:activationLink", userController.activate);

/**
 * @swagger
 * /user/auth:
 *   get:
 *     summary: Проверить авторизован пользователь или нет
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Токен пользователя
 *     responses:
 *       200:
 *         description: Пользователь авторизован
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAllInfo'
 *       401:
 *         description: Пользователь не авторизован
 */

router.get(
  "/auth",
  authMiddleware(401, "Пользователь не авторизован"),
  userController.check
);

module.exports = router;
