export {};

const ApiError = require("../error/ApiError");

module.exports = (
  err: { status: number; message: string },
  req: object,
  res: {
    status: (arg0: number) => {
      (): object;
      new (): object;
      json: { (arg0: { message: string }): void; new (): object };
    };
  }
) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "Непредвиденная ошибка" });
};
