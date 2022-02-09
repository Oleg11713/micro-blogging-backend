export {};

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const sequelize = require("./config/db");
const errorHandler = require("./middleware/errorHandlingMiddleware");
const router = require("./routes");
const { User, ADMIN } = require("./models/userModel");

const PORT = process.env.PORT || 5000;
const SALT = 5;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "Library API Of My Micro-Blogging Project",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
  },
  apis: ["./routes/*.ts"],
};

const specs = swaggerJsDoc(options);

const createAdmin = async () => {
  const user = await User.findOne({ where: { role: "ADMIN" } });
  ADMIN.password = await bcrypt.hash(ADMIN.password, SALT);
  if (!user) {
    await User.create(ADMIN);
  }
};

const app = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
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
