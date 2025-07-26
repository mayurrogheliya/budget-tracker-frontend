import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { userAPI } from "../api/endpoints/user";
import { useUserStore } from "../store/useUserStore";
import { useThemeStore } from "../store/useThemeStore";
import { Spin } from "antd";
import ThemeToggle from '../components/ThemeToggle';

const RootLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme } = useThemeStore();

  const toggleSidebar = () => {
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);
  };

  const { logout, setLoading, loading } = useUserStore();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await userAPI.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      logout();
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="absolute md:hidden bg-slate-300/15 h-min w-full flex justify-between items-center px-2 py-2 shadow-md">
        <div className="flex gap-2 items-center">
          <div>
            <img src={theme === 'dark' ? "images/icon-dark.png" : "images/icon.jpg"} alt="bt" width="25px" />
          </div>
          <h1 className="text-xl font-semibold text-center text-sky-800 dark:text-sky-400">
            Budget Tracker
          </h1>
        </div>
        <button
          className=" size-fit float-end z-20 bg-gray-200 dark:bg-gray-700 dark:text-white py-1 px-3 rounded-md hover:ring-1 hover:ring-black dark:hover:ring-gray-600"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 md:w-60 bg-white dark:bg-[#28282B] shadow-lg z-30 lg:relative lg:w-72 w-60 flex flex-col h-screen transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <div className="flex flex-col h-full">
          <div>
            <div className="flex justify-between bg-gray-100 p-4 py-2 md:py-4 gap-3 items-center dark:bg-[#1a1a1a]">
              <div className="w-full text-xl font-semibold text-sky-800 dark:text-sky-400 flex justify-center items-center gap-5">
                <div className="md:block hidden">
                  <img src={theme === 'dark' ? "images/icon-dark.png" : "images/icon.jpg"} alt="bt" width="30px" />
                </div>
                <div>Budget Tracker</div>
              </div>
              <ThemeToggle />
              <button
                className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-1 rounded-md hover:ring-1 hover:ring-black dark:hover:ring-gray-600 hover:cursor-pointer md:hidden"
                onClick={toggleSidebar}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>

            <nav className="flex flex-col mt-4 space-y-2 px-4">
              <NavLink
                to="/"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${
                    isActive ? "hover:bg-sky-700" : "hover:bg-gray-100 dark:hover:bg-[#3a3a3c]"
                  } transition-colors duration-200 ${
                    isActive ? "bg-sky-700 text-white" : "text-gray-700 dark:text-gray-300"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/analytics"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${
                    isActive ? "hover:bg-sky-700" : "hover:bg-gray-100 dark:hover:bg-[#3a3a3c]"
                  } transition-colors duration-200 ${
                    isActive ? "bg-sky-700 text-white" : "text-gray-700 dark:text-gray-300"
                  }`
                }
              >
                Analytics
              </NavLink>
            </nav>
          </div>
          <div className="mt-auto mb-4 space-y-2 px-4">
            <button
              onClick={handleLogout}
              className="block w-full py-2 px-4 text-center bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <main className="flex-1 bg-white overflow-y-auto dark:bg-[#28282B] md:ml-60 lg:ml-1 md:mt-0 mt-12 p-2">
        {loading ? (
          <Spin tip="Loading..." size="large" fullscreen />
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default RootLayout;
