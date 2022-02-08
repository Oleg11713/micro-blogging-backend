export {};

const Router = require("express");

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/viewAllUsers", userController.getAllUsers);
router.get("/viewUser/:id", userController.getOneUser);
router.get("/activate/:link", userController.activate);
router.get(
  "/auth",
  authMiddleware(401, "Пользователь не авторизован"),
  userController.check
);
router.delete(
  "/deleteUser",
  checkRoleMiddleware("ADMIN"),
  userController.delete
);

module.exports = router;
