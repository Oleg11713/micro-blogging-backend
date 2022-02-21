import { Request, Response } from "express";
const ApiError = require("../error/ApiError");

module.exports = (
  err: { status: number; message: string },
  req: Request,
  res: Response
) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "Непредвиденная ошибка" });
};
