const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    // avator: {
    //   type: String,
    //   default:
    //     "https://img.freepik.com/premium-photo/green-planet-earth-ai-generated_768802-1706.jpg",
    // },
    avatar: {
      url: {
        type: String,
      },
      public_id: {
        type: String, // cloudinary la delete panna use agum
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
