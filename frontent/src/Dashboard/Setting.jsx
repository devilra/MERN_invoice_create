import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSetting, getSettings } from "../redux/Slices/settingsSlice";
import { useEffect } from "react";

const Setting = () => {
  const [form, setForm] = useState({
    businessName: "",
    businessNumber: "",
    address: "",
    phone: "",
    email: "",
    logo: null,
  });

  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.settings);

  //console.log(form);

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    dispatch(createSetting(formData));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow-md p-6 rounded-2xl"
      >
        <input
          name="businessName"
          placeholder="Business Name"
          value={form.businessName}
          className="border p-2 rounded w-full"
          onChange={handleChange}
        />
        <input
          name="businessNumber"
          placeholder="Business Number"
          value={form.businessNumber}
          className="border p-2 rounded w-full"
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          className="border p-2 rounded w-full md:col-span-2"
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="file"
          name="logo"
          onChange={handleChange}
          className="w-full md:col-span-2"
        />
        <button
          type="submit"
          className="md:col-span-2 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg transition"
        >
          Save
        </button>
      </form>
      {loading && <p className="text-blue-600 mt-4 text-center">Loading...</p>}
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default Setting;
