const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/* ----------------------------- Token Building ----------------------------- */

const signToken = (id) => {
  console.log("hello");
  return jwt.sign({ id }, "thisismynewcourseprakharsrivastava");
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  console.log(token);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
/* ---------------------------- Registering Route --------------------------- */

exports.register = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !mobile || !password) {
    return res.status(400).send("Please ENter Details");
  }

  const alreadyUser = await User.findOne({ email });

  if (alreadyUser) {
    res.status(400).send("User Already Exist");
  } else {
    try {
      const user = new User({
        name,
        email,
        mobile,
        password,
      });
      await user.save();

      res.status(201).json({
        message: "Success",
        user,
      });
    } catch {
      res.status(400).send(error);
    }
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Unable to login");
    }

    // const user = await User.findByCredentials(
    //   req.body.email,
    //   req.body.password
    // );
    console.log(user);
    // const token = await trainer.generateAuthToken();
    // console.log(token);
    if (user) {
      console.log("Gd");
      createSendToken(user, 200, req, res);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.getUser = async (req, res) => {
  // const user = req.user;

  // if (!user) {
  //   return res.status(401).json({ message: "UnAuthorized" });
  // }
  try {
    const users = await User.find();

    if (users.length == 0) {
      return res.status(400).send("No Users Found");
    }

    res.status(201).json({
      message: "Success",
      users,
    });
  } catch (error) {
    res.status(401).send(error);
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).send({ error: "No User Found" });
  }
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    // if (!user) {
    //   return res.status(404).send();
    // }//after changing code i commented

    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.del = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).send({ error: "No User Found" });
    }
    res.status(200).json({
      message: "Deleted",
      user,
    });
  } catch (e) {
    res.status(500).send();
  }
};
