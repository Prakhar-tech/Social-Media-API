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
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running`);
});
