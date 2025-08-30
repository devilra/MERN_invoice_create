import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSettings, saveSetting } from "../redux/Slices/settingsSlice";
import { useEffect } from "react";
import { FiEdit } from "react-icons/fi";

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
  const [enabledFields, setEnabledFields] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  const [previewLogo, setPreviewLogo] = useState(null);

  //console.log(items);

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  useEffect(() => {
    if (items && items.length > 0) {
      const setting = items[0];
      // console.log(setting);
      // console.log(items);
      setForm({
        businessName: setting?.businessName || "",
        businessNumber: setting?.businessNumber || "",
        address: setting?.address || "",
        phone: setting?.phone || "",
        email: setting?.email || "",
        logo: null,
      });
      if (setting?.logo) {
        setPreviewLogo(setting.logo);
      }
    }
  }, [items]);

  const enabledField = (name) => {
    setEnabledFields({ ...enabledField, [name]: true });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
      setPreviewLogo(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
    setHasChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    await dispatch(saveSetting(formData));
    dispatch(getSettings());
    setHasChanges(false);
  };

  const renderInput = (name, placeholder, colSpan = "1") => {
    return (
      <div className={`relative col-span${colSpan}`}>
        {loading ? (
          <div className="h-10 bg-gray-200  animate-pulse rounded"></div>
        ) : (
          <input
            value={form[name]}
            name={name}
            placeholder={placeholder}
            className={`border p-2 rounded w-full text-[13px] ${
              enabledFields[name] ? "" : "bg-gray-100 cursor-not-allowed"
            }`}
            readOnly={!enabledFields[name]}
            onChange={handleChange}
          />
        )}
        {!loading && (
          <FiEdit
            className="absolute right-2 top-2 cursor-pointer text-gray-500"
            onClick={() => enabledField(name)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow-md p-6 rounded-2xl">
          <div className="h-20 bg-gray-200 animate-pulse md:col-span-2 rounded"></div>
          <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 bg-gray-200 animate-pulse md:col-span-2 rounded"></div>
          <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 bg-gray-200 animate-pulse md:col-span-2 rounded"></div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow-md p-6 rounded-2xl"
        >
          {/* Logo Preview */}

          {previewLogo && (
            <div className="md:col-span-2 flex justify-center">
              <img
                className="w-32 h-32 object-cover rounded-full mb-2 border"
                src={previewLogo}
                alt="Logo Preview"
              />
            </div>
          )}

          {/* <input
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
        /> */}

          {renderInput("businessName", "Business Name")}
          {renderInput("businessNumber", "Business Name")}
          {renderInput("address", "Address", "2")}
          {renderInput("phone", "Phone")}
          {renderInput("email", "Email")}

          <input
            type="file"
            name="logo"
            onChange={handleChange}
            className="w-full md:col-span-2"
          />
          <button
            type="submit"
            disabled={!hasChanges}
            className={`md:col-span-2 py-2 rounded-lg text-white transition ${
              hasChanges
                ? "bg-pink-600 hover:bg-pink-700 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </form>
      )}

      {/* {loading && <p className="text-blue-600 mt-4 text-center">Loading...</p>} */}
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default Setting;
