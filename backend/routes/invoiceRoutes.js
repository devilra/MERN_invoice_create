const express = require("express");
const {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  deleInvoice,
  editInvoice,
  getTotalCustomers,
  getTotalAmount,
} = require("../controllers/invoiceController");
const upload = require("../middlewares/upload");
const cloudinary = require("../utils/cloudinary");

const router = express.Router();

router.post("/", createInvoice);
router.get("/", getAllInvoices);
router.get("/total-customers", getTotalCustomers);
router.get("/:id", getInvoiceById);
router.delete("/:id", deleInvoice);
router.put("/:id", editInvoice);

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const result = await cloudinary.uploader.upload_stream(
      { folder: "invoice_products" },
      (error, uploadResult) => {
        if (error) return res.status(500).json({ message: error.message });
        res.json({ url: uploadResult.secure_url });
      }
    );

    // Pipe file buffer to Cloudinary
    result.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
