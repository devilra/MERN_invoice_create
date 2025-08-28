// Get TotalAmount customers

const Invoice = require("../models/Invoice");
const TotalPaidInvoice = require("../models/totalPaidInvoice");

exports.getTotalAmount = async (req, res) => {
  try {
    const totalAmount = await Invoice.aggregate([
      // {
      //   $match: {
      //     user: req.user._id,
      //   },
      // },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    //console.log(totalAmount);

    res.json({
      totalAmount: totalAmount.length > 0 ? totalAmount[0].total : 0,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

//Total Paid Amount

exports.totalPaidAmount = async (req, res) => {
  try {
    const result = await Invoice.aggregate([
      {
        $match: {
          paidAmount: {
            $gt: 0,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPaid: {
            $sum: "$paidAmount",
          },
        },
      },
    ]);

    const totalPaid = result.length > 0 ? result[0].totalPaid : 0;
    res.json({ totalPaid });
  } catch (error) {
    console.error("Error fetching total paid amount:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// exports.persistTotalAmount = async (req, res) => {
//   try {
//     const record = await TotalPaidInvoice.findOne();
//     res.json({ totalpaid: record ? record.totalPaid : 0 });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getTotalBalanceAmount = async (req, res) => {
  try {
    const totalBalanceAmount = await Invoice.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$balanceAmount",
          },
        },
      },
    ]);

    res.json({
      totalBalanceAmount: totalBalanceAmount[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
