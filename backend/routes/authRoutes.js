const express = require("express");
const {
  register,
  login,
  getMe,
  logout,
  getUsers,
  deleteUser,
  changePassword,
  updateProfile,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/change-password", authMiddleware, changePassword);
router.get("/me", authMiddleware, getMe);
router.get("/logout", logout);
router.get("/all", getUsers);
router.put("/update", authMiddleware, upload.single("avatar"), updateProfile);
router.delete("/:id", deleteUser);

module.exports = router;
