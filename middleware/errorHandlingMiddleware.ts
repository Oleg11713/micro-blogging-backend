export {};

const ApiError = require("../error/ApiError");

module.exports = (
  err: { status: number; message: string },
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: any }): any; new (): any };
    };
  },
  next: any
) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "Непредвиденная ошибка" });
};
