require("dotenv").config();
const express = require("express");
const cors = require("cors");
const uuid = require("uuid");

const sequelize = require("./config/db");
const errorHandler = require("./middleware/errorHandlingMiddleware");
const router = require("./routes/index");
const { User, ADMIN } = require("./models/userModel");
const bcrypt = require("bcrypt");

const PORT = process.env.PORT || 5000;
const SALT = 5;

const createAdmin = async () => {
  const user = await User.findOne({ where: { role: "ADMIN" } });
  ADMIN.password = await bcrypt.hash(ADMIN.password, SALT);
  if (!user) {
    await User.create(ADMIN);
  }
};

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    await createAdmin();
  } catch (error) {
    console.log(error);
  }
};

start();
