import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { sequelize } from "./models";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import studentsRouter from "./routes/students.route";

require("dotenv").config();

var app = express();

try {
  sequelize.sync({ alter: true });
} catch (error) {
  console.error("Failed to synchronize database schema:", error);
}
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/students", studentsRouter);

export default app;
