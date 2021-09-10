const express = require("express");
const {
  create,
  getPost,
  del,
  update,
} = require("../controllers/postController");

const { protect } = require("../middleware/auth");

const router = express.Router();

/* ------------------------------- Create Post ------------------------------ */

router.post("/create", protect, create);

/* -------------------------------- Get Post ------------------------------- */

router.get("/", protect, getPost);

/* ------------------------------- Update User ------------------------------ */

router.put("/update/:id", protect, update);

/* ------------------------------ Deleting Post ----------------------------- */

router.delete("/delete/:id", protect, del);

module.exports = router;
