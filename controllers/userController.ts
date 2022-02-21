import { NextFunction, Request, Response } from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const mailService = require("../service/mail-service");
const { User } = require("../models/userModel");
const ApiError = require("../error/ApiError");

const SALT = 5;

const generateJwt = (
  id: number,
  displayName: string,
  age: number,
  email: string,
  role: string
) => {
  return jwt.sign(
    {
      id,
      displayName,
      age,
      email,
      role,
    },
    process.env.ACCESS_TOKEN_KEY,
    { expiresIn: "24h" }
  );
};

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    const { displayName, age, email, password } = req.body;
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
    const activationLink = uuid.v4();
    const user = await User.create({
      displayName,
      age,
      email,
      password: passwordHash,
      activationLink,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/user/activate/${activationLink}`
    );
    const token = generateJwt(
      user.id,
      user.displayName,
      user.age,
      user.email,
      user.role
    );
    return res.json({ token });
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const { activationLink } = req.params;
      const user = await User.findOne({ where: { activationLink } });
      if (!user) {
        return next(ApiError.badRequest("Некорректная ссылка активации"));
      }
      user.isActivated = true;
      await user.save();
      return res.redirect(`${process.env.CLIENT_URL}/auth/login`);
    } catch (e) {
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(
        ApiError.badRequest("Пользователя с таким email не существует")
      );
    }
    if (!user.isActivated) {
      return next(ApiError.badRequest("Пользователь не подтвердил почту"));
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

  async check(
    req: {
      user: {
        id: number;
        displayName: string;
        age: number;
        email: string;
        role: string;
      };
    },
    res: Response
  ) {
    const token = generateJwt(
      req.user.id,
      req.user.displayName,
      req.user.age,
      req.user.email,
      req.user.role
    );
    return res.json({ token });
  }

  async getAllUsers(req: Request, res: Response) {
    const user = await User.findAll();
    return res.json(user);
  }

  async getOneUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    return res.json(user);
  }
}

module.exports = new UserController();
