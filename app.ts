import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { sequelize } from "./models";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import studentsRouter from "./routes/students.route";
import superAdminRouter from "./routes/super-admin.route";
import { bootstrapSuperAdmin } from "./models/seeders/super-admin.seeder";

require("dotenv").config();

var app = express();

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("👌 Database synchronized successfully");
    bootstrapSuperAdmin();
  } catch (error) {
    console.error("❌ Failed to synchronize database schema:", error);
  }
})();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/students", studentsRouter);
app.use("/super-admin", superAdminRouter);

export default app;
