import React, { useState, useRef } from "react";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, clearUser } from "../redux/features/user/userSlice"; // Adjust path to your user slice
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user) || {}; // Get user from Redux store
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null); // Store selected file

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fileInputRef = useRef(null);

  // Handle file selection for profile image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file); // Store file for API upload
      const reader = new FileReader();
      reader.onloadend = () => {
        // Temporarily update UI with local image preview
        console.log("File preview URL:", reader.result);
        dispatch(updateUser({ profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePicture = () => {
    fileInputRef.current?.click();
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    const { oldPassword, newPassword, confirmPassword } = passwords;

    if (!oldPassword && !profileImageFile) {
      errors.oldPassword = "Old password or profile image is required.";
    }
    if (newPassword && newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters.";
    }
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
  };

  const saveChanges = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setIsLoading(true);
      setFormErrors({});

      // Prepare FormData for API request
      const formData = new FormData();
      if (passwords.oldPassword && passwords.newPassword) {
        formData.append("oldPassword", passwords.oldPassword);
        formData.append("newPassword", passwords.newPassword);
      }
      if (profileImageFile) {
        formData.append("profileImage", profileImageFile);
      }

      // Make API request with cookies
      const response = await axios.put(
        "http://localhost:8000/auth/update-user",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Send cookies with the request
        }
      );

      // Update Redux store with response data
      const updatedUser = response.data.data || response.data; // Adjust based on API response structure
      dispatch(updateUser(updatedUser));

      toast.success("User updated successfully!");
      setPasswords({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setProfileImageFile(null); // Clear selected file
    } catch (err) {
      console.error("Error updating user:", err);
      if (err.response?.data?.errors) {
        setFormErrors(err.response.data.errors);
      } else if (err.response?.status === 401) {
        setFormErrors({
          general: "Session expired or invalid token. Please log in again.",
        });
        dispatch(clearUser()); // Clear user from Redux
        setTimeout(() => {
          window.location.href = "/login"; // Or use react-router-dom's useNavigate
        }, 1000);
      } else if (err.response?.status === 400) {
        setFormErrors({
          general: err.response.data.message || "Invalid input",
        });
      } else {
        setFormErrors({ general: "An unexpected error occurred." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-white">Account Settings</h1>
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Profile Picture */}
          <div className="bg-dark-secondary rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">
                Profile Picture
              </h2>
              <p className="text-text-primary text-sm mt-1">
                Update your profile image
              </p>
            </div>
            <div className="p-6 flex flex-col items-center">
              <div className="relative mb-6 group">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <img
                    src={user.profileImage || "/default-profile.png"}
                    alt={user.username || "User"}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <button
                className="bg-button-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                onClick={handleChangePicture}
              >
                Change Picture
              </button>
            </div>
          </div>

          {/* Personal Info */}
          <div className="bg-dark-secondary rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">
                Personal Information
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="text-sm font-medium text-white">Name</label>
                <div className="p-4 bg-dark-primary rounded-md text-white">
                  {user.username || "N/A"}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-white">Email</label>
                <div className="p-4 bg-dark-primary rounded-md text-white">
                  {user.email || "N/A"}
                </div>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-dark-secondary rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">
                Change Password
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {formErrors.general && (
                <p className="text-red-500 text-sm">{formErrors.general}</p>
              )}
              <div>
                <label className="text-sm font-medium text-white">
                  Old Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={handlePasswordChange}
                  className="primary-input !bg-dark-primary"
                  placeholder="Enter old password"
                />
                {formErrors.oldPassword && (
                  <p className="text-red-500 text-sm">
                    {formErrors.oldPassword}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-white">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  className="primary-input !bg-dark-primary"
                  placeholder="Enter new password"
                />
                {formErrors.newPassword && (
                  <p className="text-red-500 text-sm">
                    {formErrors.newPassword}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-white">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  className="primary-input !bg-dark-primary"
                  placeholder="Confirm new password"
                />
                {formErrors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>
              <button
                className="bg-button-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors w-full flex justify-center items-center gap-2"
                onClick={saveChanges}
                disabled={isLoading}
              >
                {isLoading && <FaSpinner className="animate-spin" />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
