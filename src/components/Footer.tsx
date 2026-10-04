import { HeartFilled } from "@ant-design/icons";

function Footer() {
  return (
    <>
      <footer className="border-t border-slate-100 bg-[#FFFCFC] dark:border-gray-700 dark:bg-[#242424]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 sm:gap-3 px-4 py-4 text-xs text-slate-500 dark:text-gray-400 sm:px-6 sm:py-6 sm:text-sm md:flex-row">
          <span>© {new Date().getFullYear()} BudgetTracker</span>
          <span className="flex items-center gap-1.5">
            Made with <HeartFilled className="text-rose-500" /> by{" "}
            <a
              href="https://github.com/mayurrogheliya"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-slate-700 hover:text-sky-600 dark:text-gray-300 dark:hover:text-sky-400"
            >
              Mayur Rogheliya
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
