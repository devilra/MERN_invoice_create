// routes/uploadRoute.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: "Image upload failed" });
  }
  res.json({ url: req.file.path });
});

module.exports = router;
