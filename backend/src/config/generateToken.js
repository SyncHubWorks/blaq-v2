import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (res, id) => {
  const token = jwt.sign({ id }, ENV.JWT_SECRET, { expiresIn: "7d" });

  // In development we use sameSite: "lax" + secure: false
  // because we are using a Vite proxy to keep requests same-origin.
  const isDev = ENV.NODE_ENV === "development";

  res.cookie("token", token, {
    httpOnly: true,
    secure: !isDev, // true in production (HTTPS), false on localhost
    sameSite: isDev ? "lax" : "none", // "lax" for same-origin proxy, "none" for cross-site in prod
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
