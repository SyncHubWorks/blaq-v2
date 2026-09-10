import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { ENV } from "./config/env.js";
import { connectDb } from "./config/db.js";

const app = express();
const { PORT, FRONTEND_URL } = ENV;

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// check health
app.get("/health", (_req, res) => {
  res.status(200).json({
    message: "Server started",
  });
});

// API ROUTES

// Connect DB then start the server
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("App running on port", PORT);
  });
});
