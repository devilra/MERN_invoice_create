import API from "../api";

export const getInvoices = async () => {
  const res = await API.get("/api/invoices");
  return res.data;
};

export const getAllCustomers = async () => {
  const res = API.get("/api/invoices/total-customers");
  return res.data;
};
