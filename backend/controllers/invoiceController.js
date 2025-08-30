const Invoice = require("../models/Invoice");
const TotalPaidInvoice = require("../models/totalPaidInvoice");

exports.createInvoice = async (req, res) => {
  //console.log(req.user);
  try {
    const lastInvoice = await Invoice.findOne().sort({ invoiceNumber: -1 });
    let newNumber = 1;

    if (lastInvoice && lastInvoice.invoiceNumber) {
      const lastNumber = parseInt(
        lastInvoice.invoiceNumber.replace("INV", ""),
        10
      );
      newNumber = lastNumber + 1;
    }

    const autoInvoiceNumber = `INV${newNumber.toString().padStart(4, "0")}`;

    const invoice = new Invoice({
      ...req.body,
      //user: req.user._id,
      invoiceNumber: autoInvoiceNumber,
    });

    await invoice.save();

    if (invoice.paidAmount > 0) {
      let record = await TotalPaidInvoice.findOne();
      if (!record) {
        record = await TotalPaidInvoice.create({
          totalPaid: invoice.paidAmount,
        });
      } else {
        record.totalPaid += invoice.paidAmount;
        await record.save();
      }
    }

    res.status(201).json({
      msg: "Invoice save Successfull",
      invoice,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllInvoices = async (req, res) => {
  try {
    const { date } = req.query;
    //console.log(date);
    let filter = {};

    if (date) {
      const start = new Date(date + "T00:00:00.000Z");
      //start.setHours(0, 0, 0, 0);
      const end = new Date(date + "T23:59:59.999Z");
      // end.setHours(23, 59, 59, 999);

      //console.log(date, start, end);

      filter.invoiceDate = {
        $gte: start,
        $lte: end,
      };
    }

    const invoices = await Invoice.find(filter).sort({ invoiceDate: -1 });
    if (invoices.length === 0) {
      return res.json({
        msg: "No invoices",
      });
    }
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.json({
        msg: "Invoice Not Found",
      });
    }

    res.json(invoice);
  } catch (error) {
    res.status(404).json({ message: "Invoice not found" });
  }
};

exports.deleInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.json({
        msg: "Invoice Not Found",
      });
    }
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({
      msg: "Invoice Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editInvoice = async (req, res) => {
  try {
    const updated = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get Total Unique Customers

exports.getTotalCustomers = async (req, res) => {
  try {
    const customers = await Invoice.distinct("customerName");
    //console.log(customers);
    if (!customers || customers.length === 0) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json({ totalCustomers: customers.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
