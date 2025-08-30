const { default: mongoose } = require("mongoose");
const Setting = require("../models/setting");

// exports.createSetting = async (req, res) => {
//   try {
//     const { businessName, businessNumber, address, phone, email } = req.body;

//     const logoUrl = req.file ? req.file.path : null;

//     const newSetting = new Setting({
//       businessName,
//       businessNumber,
//       address,
//       phone,
//       email,
//       logo: logoUrl,
//     });

//     await newSetting.save();
//     res.status(201).json({ success: true, data: newSetting });

//     console.log(newSetting);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Get all settings

// exports.getSettings = async (req, res) => {
//   try {
//     const settings = await Setting.find();
//     console.log(settings);
//     res.json({
//       data: settings,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Get single setting

// exports.getSettingId = async (req, res) => {
//   try {
//     const setting = await Setting.findById(req.params.id);
//     if (!setting) return res.status(404).json({ message: "Setting not found" });

//     res.json({ success: true, data: setting });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.updateSetting = async (req, res) => {
//   try {
//     const { businessName, businessNumber, address, phone, email } = req.body;
//     const logoUrl = req.file ? req.file.path : null;

//     console.log(logoUrl);

//     const updated = await Setting.findByIdAndUpdate(
//       req.params.id,
//       {
//         businessName,
//         businessNumber,
//         address,
//         phone,
//         email,
//         ...(logoUrl && { logo: logoUrl }),
//       },
//       { new: true }
//     );

//     if (!updated) return res.status(404).json({ message: "Setting not found" });

//     res.json({ success: "Updated Successfull", data: updated });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.deleteSetting = async (req, res) => {
//   console.log(req.params.id);
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ message: "Invalid ID format" });
//   }
//   try {
//     const deleted = await Setting.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Setting not found" });
//     res.json({ message: "Setting deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.createOrUpdatesSetting = async (req, res) => {
  try {
    const { businessName, businessNumber, address, phone, email } = req.body;
    const logoUrl = req.file ? req.file.path : null;
  } catch (error) {}
};
