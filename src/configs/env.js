require("dotenv").config();

module.exports = {
  DATABASE: {
    HOST: process.env.DB_HOST,
    PORT: parseInt(process.env.DB_PORT),
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PASS: process.env.DB_PASS,
    LOGGING: process.env.DB_LOGGING === "true",
  },
  SERVER: {
    SERECT_KEY: process.env.SERECT_KEY,
  },
};
