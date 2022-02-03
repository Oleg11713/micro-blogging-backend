const jwt = require("jsonwebtoken");

module.exports = function (status, message) {
  return function (req, res, next) {
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
