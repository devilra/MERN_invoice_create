const express = require("express");
const {
  register,
  login,
  getMe,
  logout,
  getUsers,
  deleteUser,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.get("/logout", logout);
router.get("/all", getUsers);
router.delete("/:id", deleteUser);

module.exports = router;
