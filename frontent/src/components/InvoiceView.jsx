import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import { useDispatch, useSelector } from "react-redux";
import { getSettings } from "../redux/Slices/settingsSlice";

const SettingSkeleton = () => {
  return (
    <div>
      <div className="h-10 w-40 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
      <div className="h-3 w-56 bg-gray-200 rounded mb-1"></div>
      <div className="h-3 w-48 bg-gray-200 rounded mb-1"></div>
    </div>
  );
};

const InvoiceView = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [setting, setSetting] = useState(null);
  const printRef = useRef();
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.settings);

  useEffect(() => {
    if (!items || items.length === 0) {
      dispatch(getSettings());
    }
  }, [dispatch, items]);

  useEffect(() => {
    if (items && items.length > 0) {
      setSetting(items[0]);
    }
    console.log(setting);
  }, [items, setting]); // setting-ai dependency-il serthullen

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await API.get(`/api/invoices/${id}`);
        setInvoice(res.data);
      } catch (error) {
        alert("Invoice not found");
      }
    };

    fetchInvoice();
  }, [id]);

  const handlePrint = () => {
    const element = printRef.current;

    // Wait until all images are loaded before generating PDF
    const loadImages = () => {
      const images = element.querySelectorAll("img");
      const promises = Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // continue even if an image fails
        });
      });
      return Promise.all(promises);
    };

    loadImages().then(() => {
      html2pdf()
        .from(element)
        .set({
          margin: 10,
          filename: `Invoice-${id}.pdf`,
          html2canvas: {
            scale: 2,
            useCORS: true, // Allow cross-origin images
            logging: false,
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .outputPdf("bloburl") // Get PDF as Blob URL
        .then((pdfUrl) => {
          if (window.innerWidth > 768) {
            // Desktop → open in new tab with print option
            const win = window.open(pdfUrl, "_blank");
            if (win) win.focus();
          } else {
            // Mobile → directly download
            window.location.href = pdfUrl;
          }
        });
    });
  };

  const handleDownloadPDF = async () => {
    // Backup original styles
    const originalWidth = document.body.style.width;
    const originalZoom = document.body.style.zoom;

    // Force desktop layout for PDF generation
    document.body.style.width = "1024px"; // force wider layout
    document.body.style.zoom = "1";

    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice-${id}.pdf`);

    // Restore original styles
    document.body.style.width = originalWidth;
    document.body.style.zoom = originalZoom;
  };

  if (!invoice) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 w-1/3 rounded"></div>
          <div className="h-4 bg-gray-200 w-1/4 rounded"></div>
          <div className="h-64 bg-gray-200 w-full rounded"></div>
        </div>
      </div>
    );
  }

  const totalCGST = invoice.products.reduce(
    (sum, item) =>
      sum + ((item.rate || 0) * (item.quantity || 0) * (item.cgst || 0)) / 100,
    0,
  );
  const totalSGST = invoice.products.reduce(
    (sum, item) =>
      sum + ((item.rate || 0) * (item.quantity || 0) * (item.sgst || 0)) / 100,
    0,
  );
  const totalAmount = invoice.products.reduce(
    (sum, item) => sum + (item.rate || 0) * (item.quantity || 0),
    0,
  );
  const grandTotal = totalAmount + totalCGST + totalSGST;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Invoice #{invoice.invoiceNumber}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Print
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Download PDF
          </button>
        </div>
      </div>

      <div
        ref={printRef}
        className="bg-white p-6 shadow rounded-md border overflow-x-auto"
      >
        <div className="mb-6 ">
          <div>
            {setting?.logo ? (
              <img
                src={setting.logo}
                alt={setting.businessName}
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50px",
                  margin: "10px",
                }}
              />
            ) : (
              <div className="w-[70px] h-[70px] rounded-full bg-gray-200 animate-pulse m-2"></div>
            )}
          </div>
          <div className="flex justify-between header-flex">
            <div>
              {setting ? (
                <div>
                  <h1 className="font-extrabold">{setting.businessName}</h1>
                  <h1
                    style={{ fontFamily: "sans-serif", fontSize: "14px" }}
                    className="text-[14px]"
                  >
                    Business Number
                  </h1>
                  <p style={{ fontFamily: "sans-serif", fontSize: "14px" }}>
                    {setting.businessNumber}
                  </p>
                  <p style={{ fontFamily: "sans-serif", fontSize: "12px" }}>
                    <strong>GSTIN:</strong> 33HDWPK4367L1ZO
                  </p>
                  <p style={{ fontSize: "12px", fontFamily: "monospace" }}>
                    <span className="inline-block w-[100px]">
                      {setting.address}
                    </span>
                    <br />
                    {setting.phone}
                    <br />
                    {setting.email}
                  </p>
                </div>
              ) : (
                <SettingSkeleton />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2">
                Customer Info
              </h3>
              <div
                style={{ fontFamily: "monospace" }}
                className="text-sm text-gray-600"
              >
                <p>
                  <strong>Name:</strong> {invoice.customerName}
                </p>
                <p>
                  <strong>Phone:</strong> {invoice.phone}
                </p>
                <p>
                  <strong>Address:</strong> {invoice.address}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(invoice.invoiceDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100 text-gray-800 text-center">
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Rate</th>
              <th className="p-2 border">CGST %</th>
              <th className="p-2 border">CGST Amt</th>
              <th className="p-2 border">SGST %</th>
              <th className="p-2 border">SGST Amt</th>
              <th className="p-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.products.map((item, index) => {
              const baseAmount = (item.rate || 0) * (item.quantity || 0);
              const cgstAmount = (baseAmount * (item.cgst || 0)) / 100;
              const sgstAmount = (baseAmount * (item.sgst || 0)) / 100;
              const totalItemAmount = baseAmount + cgstAmount + sgstAmount;
              return (
                <tr key={index} className="text-center">
                  <td className="p-2 border">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover mx-auto rounded"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No image</span>
                    )}
                  </td>
                  <td className="p-2 border">{item.title}</td>
                  <td
                    className="p-2 border text-left"
                    style={{
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      fontSize: "11px",
                    }}
                  >
                    {item.description}
                  </td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">₹{item.rate}</td>
                  <td className="p-2 border">{item.cgst || 0}%</td>
                  <td className="p-2 border">₹{cgstAmount.toFixed(2)}</td>
                  <td className="p-2 border">{item.sgst || 0}%</td>
                  <td className="p-2 border">₹{sgstAmount.toFixed(2)}</td>
                  <td className="p-2 border">₹{totalItemAmount.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6" className="text-right font-bold border p-2">
                Total CGST:
              </td>
              <td className="text-right border p-2">₹{totalCGST.toFixed(2)}</td>
              <td colSpan="2" className="border p-2"></td>
              <td className="border p-2"></td>
            </tr>
            <tr>
              <td colSpan="7" className="text-right font-bold border p-2">
                Total SGST:
              </td>
              <td className="text-right border p-2">₹{totalSGST.toFixed(2)}</td>
              <td className="border p-2"></td>
            </tr>
            <tr>
              <td colSpan="9" className="text-right font-bold border p-2">
                Grand Total:
              </td>
              <td className="text-right border p-2">
                ₹{grandTotal.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* --- TERMS AND CONDITIONS SECTION --- */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-start space-y-4 sm:space-y-0">
          {/* Terms and Conditions Column (Left) */}
          <div className="w-full sm:w-2/3 text-xs text-gray-700 pr-4">
            <h4 className="font-bold text-sm mb-1">Terms and Conditions:</h4>
            <ul className="list-disc ml-4 space-y-1">
              <li>
                Delivery: Immediate depending on stock and other order in prior.
              </li>
              <li>
                Quoted price may increase depend upon the customer
                specification.
              </li>
              <li>
                Quoted price are valid for 15days from the date of quotation.
              </li>
              <li>
                80% advance should be paid before unloading materials, and the
                final 20% balance is due after the work is completed.
              </li>
              {/* <li>All civil work & Scaffolding are in customer scope.</li> */}
            </ul>

            {/* <h4 className="font-bold text-sm mt-3 mb-1">Payment Terms:</h4> */}
            {/* <p>
              We have fulfilled 80% of the material supply; the final 20% is
              scheduled for immediate completion.
            </p> */}
          </div>

          {/* Summary Column (Right) */}
          <div className="w-full sm:w-1/3 text-right text-gray-700 text-sm sm:text-base">
            <div className="space-y-1">
              <p>
                <strong>Total:</strong> ₹{invoice.totalAmount}
              </p>
              <p>
                <strong>Paid:</strong> ₹{invoice.paidAmount}
              </p>
              <p>
                <strong>Balance:</strong> ₹{invoice.balanceAmount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
