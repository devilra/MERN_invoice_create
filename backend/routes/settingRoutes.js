const express = require("express");
const upload = require("../middlewares/upload");
const {
  createSetting,
  getSettings,
  getSettingId,
  updateSetting,
  deleteSetting,
} = require("../controllers/settingController");
const router = express.Router();

router.post("/", upload.single("logo"), createSetting);
router.get("/", getSettings);
router.get("/:id", getSettingId);
router.put("/:id", upload.single("logo"), updateSetting);
router.delete("/:id", deleteSetting);

module.exports = router;
