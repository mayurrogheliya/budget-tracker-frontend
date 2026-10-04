import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Button } from "antd";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { useUserStore } from "../store/useUserStore";
import { useState } from "react";

function Header() {
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-100 bg-[#FFFCFC]/90 backdrop-blur dark:border-gray-700 dark:bg-[#242424]/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link
            to="/"
            className="text-base font-semibold tracking-tight text-sky-800 dark:text-sky-400 sm:text-lg"
          >
            Budget
            <span className="text-sky-500 dark:text-sky-300">Tracker</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-slate-500 dark:text-gray-400 md:flex">
            <a
              href="#features"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              How it works
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {/* Desktop auth area */}
            <div className="hidden items-center gap-2 md:flex">
              {isAuthenticated ? (
                <Button
                  className="bg-sky-600 !text-gray-50 hover:!bg-sky-600 hover:shadow-lg hover:shadow-sky-600/30 transition-all"
                  onClick={() => navigate("/dashboard")}
                >
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    type="text"
                    className="border-slate-300 hover:!border-sky-600 hover:!text-sky-600 hover:shadow-lg transition-all dark:!border-gray-600 dark:!text-gray-300 dark:hover:!border-sky-400 dark:hover:!text-sky-400"
                    onClick={() => navigate("/login")}
                  >
                    Sign in
                  </Button>
                  <Button
                    className="bg-sky-600 !text-gray-50 hover:!bg-sky-600 hover:shadow-lg hover:shadow-sky-600/30 transition-all"
                    onClick={() => navigate("/register")}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile hamburger, same spot your portfolio uses */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-md text-xl text-slate-700 dark:text-gray-200 md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </div>
        </div>

        {/* Mobile inline slide-down menu */}
        <div
          className={`overflow-hidden border-t border-slate-100 bg-[#FFFCFC] transition-[max-height] duration-300 ease-in-out dark:border-gray-700 dark:bg-[#242424] md:hidden ${
            menuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-1 px-4 py-3 text-sm">
            <a
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="rounded px-2 py-2 text-slate-600 hover:bg-slate-50 dark:text-gray-300 dark:hover:bg-[#2b2b2b]"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMenuOpen(false)}
              className="rounded px-2 py-2 text-slate-600 hover:bg-slate-50 dark:text-gray-300 dark:hover:bg-[#2b2b2b]"
            >
              How it works
            </a>

            {!isAuthenticated && (
              <div className="mt-2 flex gap-2 border-t border-slate-100 pt-3 dark:border-gray-700">
                <div className="flex gap-2">
                  <Button
                    block
                    className="border-slate-300 dark:!border-gray-600 dark:!text-gray-200"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/login");
                    }}
                  >
                    Sign in
                  </Button>
                  <Button
                    block
                    className="bg-sky-600 !text-gray-50 hover:!bg-sky-600"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/register");
                    }}
                  >
                    Sign up
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
