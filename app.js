const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const authRouter = require("./app/api/auth/router");
const productRouter = require("./app/api/product/router");
const URL = `/api/v1`;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const app = express();
app.use(cors());
app.use(logger("dev"));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ message: "welcome to the API MyApp" });
});
app.use(`${URL}`, authRouter);
app.use(`${URL}`, productRouter);

module.exports = app;
