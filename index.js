import express from "express";
import mongoose from "mongoose";

import { registerValidation, loginValidation } from "./validations/auth.js";
import { postCreateValidation } from "./validations/post.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

const PORT = process.env.PORT || 4444;

mongoose
  .connect("mongodb://root:example@localhost:27017/mongo_db?authSource=admin")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB ERROR", err));

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, UserController.register);
app.post("/auth/login", loginValidation, UserController.login);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.patch("/posts/:id", checkAuth, PostController.update);
app.delete("/posts/:id", checkAuth, PostController.remove);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server is running on port ${PORT}`);
});
