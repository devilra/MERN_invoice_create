import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  getMe,
  updateProfile,
} from "../redux/Slices/authSlice";
import { FaCamera, FaEye, FaEyeSlash } from "react-icons/fa";

const ProfileSkeleton = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded animate-pulse">
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full bg-gray-300"></div>
      </div>
      <div className="mb-2">
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-5 bg-gray-300 rounded w-full"></div>
      </div>
      <div className="mb-2">
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-5 bg-gray-300 rounded w-full"></div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="h-10 w-24 bg-gray-300 rounded"></div>
        <div className="h-10 w-24 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const [editing, setEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // button state
  const [avatarFile, setAvatarFile] = useState(null);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const fileInputRef = useRef(null);

  console.log(avatarFile);

  useEffect(() => {
    if (!user) {
      dispatch(getMe());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        avatar: user.avatar?.url || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // disable button while request in progress

    dispatch(changePassword(formData))
      .unwrap()
      .then((msg) => {
        setSuccessMsg(msg);
        setFormData({ currentPassword: "", newPassword: "" });
        setShowPasswordForm(false);
        setIsSubmitting(false);
      })
      .catch(() => {
        setSuccessMsg("");
        setIsSubmitting(false); // re-enable if error
      });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    if (avatarFile) {
      const data = new FormData();
      data.append("name", profileData.name);
      data.append("email", profileData.email);
      if (avatarFile) data.append("avatar", avatarFile);

      console.log(data);
      dispatch(updateProfile(data))
        .unwrap()
        .then((res) => {
          setSuccessMsg("Profile updated successfully");
          setEditing(false);
          setAvatarFile(null);
          // console.log(res?.avatar?.url);
          if (res?.avatar?.url) {
            setProfileData((prev) => ({
              ...prev,
              avatar: res.avatar.url,
            }));
          }
          dispatch(getMe());
        })
        .catch(() => {
          setSuccessMsg("");
        });
    } else {
      dispatch(updateProfile(profileData))
        .unwrap()
        .then(() => {
          setSuccessMsg("Profile updated successfully");
          setEditing(false);
          setAvatarFile(null);
        })
        .catch(() => {
          setSuccessMsg("");
        });
    }
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      //console.log(e.target.files[0]);
      const file = e.target.files[0];
      setAvatarFile(file);
      setProfileData({ ...profileData, avatar: URL.createObjectURL(file) });
    }
  };

  const isButtonDisabled =
    isSubmitting ||
    formData.currentPassword.trim() === "" ||
    formData.newPassword.trim() === "";

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      {loading ? (
        <ProfileSkeleton />
      ) : (
        user && (
          <>
            {!editing ? (
              <>
                {/* {Avatar} */}
                {/* <div className="flex justify-center mb-4 relative">
                    <img
                      src={
                        profileData.avatar ||
                        "https://img.freepik.com/premium-photo/green-planet-earth-ai-generated_768802-1706.jpg"
                      }
                      alt="avatar"
                      readOnly
                      className="w-24 h-24 rounded-full object-cover border border-gray-300"
                    />
                  </div> */}
                <div className="mb-2">
                  <label className="block text-gray-600">Name</label>
                  <input
                    value={profileData.name}
                    type="text"
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-600">Email</label>
                  <input
                    type="text"
                    value={profileData.email}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100"
                  />
                </div>
                <button
                  onClick={() => setEditing(!editing)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-all duration-300"
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <form onSubmit={handleProfileUpdate} className="mb-4">
                {/* {Avatar} */}
                {/* <div className="flex justify-center mb-4 relative">
                  <img
                    src={
                      profileData.avatar ||
                      "https://img.freepik.com/premium-photo/green-planet-earth-ai-generated_768802-1706.jpg"
                    }
                    alt="avatar"
                    className="w-24 h-24 rounded-full object-cover border border-gray-300"
                  />
                  <span
                    onClick={handleAvatarClick}
                    className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-700"
                  >
                    <FaCamera />
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleAvatarChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div> */}
                <div className="mb-2">
                  <label className="block text-gray-600">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 transition-all duration-300 text-white rounded mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 bg-gray-400 hover:bg-gray-500 transition-all duration-300 text-white rounded"
                >
                  Cancel
                </button>
              </form>
            )}
          </>
        )
      )}

      {!showPasswordForm ? (
        <button
          onClick={() => setShowPasswordForm(true)}
          className="mt-4 px-4 py-2 hover:bg-blue-600 mx-2 transition-all duration-300 bg-blue-500 text-white rounded"
        >
          Change Password
        </button>
      ) : (
        <form className="mt-4" onSubmit={handlePasswordChange}>
          <div className="mb-2 relative">
            <label className="block text-gray-600">
              Current Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showCurrentPassword ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            {formData.currentPassword.trim() !== "" && (
              <span
                className="absolute right-3 top-9 cursor-pointer text-gray-600"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            )}
          </div>
          <div className="mb-2 relative">
            <label className="block text-gray-600">
              New Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            {formData.newPassword.trim() !== "" && (
              <span
                className="absolute right-3 top-9 cursor-pointer text-gray-600"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`px-4 py-2 rounded text-white transition-all duration-300 ${
              isButtonDisabled
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
          <button
            type="button"
            onClick={() => setShowPasswordForm(false)}
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-400 mx-2 hover:bg-gray-500 transition-all duration-300 text-white rounded"
          >
            Cancel
          </button>
        </form>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {successMsg && <p className="text-green-500 mt-2">{successMsg}</p>}
    </div>
  );
};

export default Profile;
