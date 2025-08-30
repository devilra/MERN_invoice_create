const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    businessNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Setting", settingSchema);
