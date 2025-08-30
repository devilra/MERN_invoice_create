const express = require("express");
const upload = require("../middlewares/upload");
const {
  getSettings,

  deleteSetting,
  createOrUpdatesSetting,
} = require("../controllers/settingController");
const router = express.Router();

// Create or Update setting

router.post("/", upload.single("logo"), createOrUpdatesSetting);

// Get setting
router.get("/", getSettings);
// router.get("/:id", getSettingId);
// router.put("/:id", upload.single("logo"), updateSetting);
// router.delete("/:id", deleteSetting);

// Delete setting

router.delete("/", deleteSetting);

module.exports = router;
