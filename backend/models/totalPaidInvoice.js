const mongoose = require("mongoose");

const totalPaidSchema = new mongoose.Schema({
  totalPaid: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("TotalPaid", totalPaidSchema);
