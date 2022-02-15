const jwt = require("jsonwebtoken");

module.exports = function (status: number, message: string) {
  return function (
    req: { method: string; headers: { authorization: string }; user: Object },
    res: {
      status: (arg0: number) => {
        (): object;
        new (): object;
        json: { (arg0: { message: string }): void; new (): object };
      };
    },
    next: () => void
  ) {
    if (req.method === "OPTION") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      req.user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
      next();
    } catch (e) {
      res.status(status).json({ message: message });
    }
  };
};
