import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT || 5050,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  FRONTEND_URL: process.env.FRONTEND_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

const requiredKeys = ["MONGO_URI", "FRONTEND_URL", "JWT_SECRET"];

for (const key of requiredKeys) {
  if (!ENV[key]) {
    throw new Error(`Missing key required: ${key}`);
  }
}
