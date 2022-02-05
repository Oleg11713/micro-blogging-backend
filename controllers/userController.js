const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/userModel");
const ApiError = require("../error/ApiError");

const SALT = 5;

const generateJwt = (id, displayName, age, email, role) => {
  return jwt.sign(
    { id, displayName, age, email, role },
    process.env.ACCESS_TOKEN_KEY,
    { expiresIn: "24h" }
  );
};

class UserController {
  async registration(req, res, next) {
    const { displayName, age, email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Неверный логин или пароль"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }
    const passwordHash = await bcrypt.hash(password, SALT);
    const user = await User.create({
      displayName,
      age,
      email,
      password: passwordHash,
      role,
    });
    const token = generateJwt(
      user.id,
      user.displayName,
      user.age,
      user.email,
      user.role
    );
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(
        ApiError.badRequest("Пользователя с таким email не существует")
      );
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest("Неверный пароль"));
    }
    const token = generateJwt(
      user.id,
      user.displayName,
      user.age,
      user.email,
      user.role
    );
    return res.json({ token });
  }

  async delete(req, res) {
    const { email } = req.body;
    const user = await User.findByPk(email);
    await user.destroy();
    return res.json(user);
  }

  async check(req, res, next) {
    const token = generateJwt(
      req.user.id,
      req.user.displayName,
      req.user.age,
      req.user.role,
      req.user.email
    );
    return res.json({ token });
  }

  async getAllUsers(req, res) {
    const user = await User.findAll();
    return res.json(user);
  }

  async getOneUser(req, res) {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    return res.json(user);
  }
}

module.exports = new UserController();
