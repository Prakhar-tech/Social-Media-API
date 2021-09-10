const express = require("express");
const {
  getUser,
  update,
  del,
  register,
  login,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");

const router = express.Router();

/* ------------------------------- Registering ------------------------------ */

router.post("/register", register);

/* ---------------------------------- Login --------------------------------- */

router.post("/login", login);

/* --------------------------------  Get Users ------------------------------- */

router.get("/", getUser);

/* ------------------------------- Update User ------------------------------ */

router.put("/update/:id", update);

/* ------------------------------ Deleting User ----------------------------- */

router.delete("/delete/:id", del);

module.exports = router;
