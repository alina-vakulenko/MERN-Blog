import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

import corsOptions from "./config/corsOptions";
import { deserializeUser, requireAuth } from "./middleware";
import authRouter from "./routes/auth/auth";
import {
  usersRouter,
  productsRouter,
  categoriesRouter,
  postsRouter,
} from "./routes/api";

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/posts", postsRouter);

app.post(
  "/upload",
  deserializeUser,
  requireAuth,
  upload.single("image"),
  (req, res) => {
    if (req.file) {
      res.json({
        url: `/uploads/${req.file.originalname}`,
      });
    }
  }
);

app.all("*", (req, res) => {
  res.sendStatus(404);
});

export default app;
