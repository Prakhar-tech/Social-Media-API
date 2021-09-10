const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");
const userRouter = require("./routers/user");
const postRouter = require("./routers/post");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Setting Routes
app.get("/", () => {
  res.send("Welcome To My Api");
});
app.use("/users", userRouter);
app.use("/posts", postRouter);

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Server is running`);
});
