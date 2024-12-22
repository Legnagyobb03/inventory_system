import React, { useState, useEffect } from "react";
import { motion, AnimatePresence} from "framer-motion";
import { FaUserCircle, FaSignOutAlt, FaTimes, FaEdit } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../api";
import { toast } from "react-hot-toast";


const profileIcons = [FaUserCircle];

const RightSidebar = ({ onToggle }) => {
  const [user, setUser] = useState({ name: "", email: "", icon: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = () => {
      const userInfo = localStorage.getItem("userInfo");
      const role = localStorage.getItem("role");
      if (userInfo) {
        const parsedUser = JSON.parse(userInfo);
        setUser((prevUser) => ({
          ...prevUser,
          name: parsedUser.name,
          email: parsedUser.email,
          role: role || parsedUser.role,
          icon: parsedUser.icon || 0,
        }));
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    onToggle();
  };

  const ProfileIcon = profileIcons[user.icon];

  return (
    <>
      <motion.button
        onClick={toggleSidebar}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg ${
          isSidebarOpen ? "bg-red-500" : "bg-darkTeal"
        }`}
      >
        {isSidebarOpen ? (
          <FaTimes size={24} className="text-white" />
        ) : (
          <ProfileIcon size={24} className="text-white" />
        )}
      </motion.button>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed top-0 right-0 h-screen w-64 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } text-${isDarkMode ? "white" : "black"} shadow-lg p-6 flex flex-col z-40`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 text-center"
            >
              <ProfileIcon className={`mx-auto text-6xl mb-4 ${isDarkMode ? "text-teal" : "text-navyBlue"}`} />
              {isEditing ? (
                <ProfileUpdateForm
                  user={user}
                  onUpdate={(updatedUser) => {
                    setUser(updatedUser);
                    setIsEditing(false);
                    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
                  }}
                />
              ) : (
                <>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-sm opacity-75">{user.email}</p>
                </>
              )}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className={`mt-auto flex items-center justify-center space-x-2 py-2 px-4 rounded-md ${
                isDarkMode
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-red-500 text-white hover:bg-red-600"
              } transition-colors duration-300`}
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RightSidebar;
