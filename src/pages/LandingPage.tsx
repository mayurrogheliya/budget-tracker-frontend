import { useNavigate } from "react-router-dom";
import { Button, Card } from "antd";
import {
  ArrowRightOutlined,
  WalletOutlined,
  PieChartOutlined,
  SafetyCertificateOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import { useUserStore } from "../store/useUserStore";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FEATURES = [
  {
    icon: <WalletOutlined />,
    color: "#0284c7",
    bg: "bg-sky-50 dark:bg-sky-900/30",
    iconColor: "text-sky-600 dark:text-sky-400",
    title: "Track every transaction",
    body: "Log income and expenses in seconds, edit or remove them any time, and keep a clean running history.",
  },
  {
    icon: <PieChartOutlined />,
    bg: "bg-violet-50 dark:bg-violet-900/30",
    iconColor: "text-violet-600 dark:text-violet-400",
    title: "See where it goes",
    body: "Interactive charts turn a month of spending into a picture you can actually read at a glance.",
  },
  {
    icon: <SafetyCertificateOutlined />,
    bg: "bg-emerald-50 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    title: "Your data, secured",
    body: "Accounts are protected with hashed passwords and signed sessions — your numbers stay yours.",
  },
  {
    icon: <MobileOutlined />,
    bg: "bg-amber-50 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    title: "Built for every screen",
    body: "A responsive layout with light and dark modes, so it looks right on a phone or a desktop.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Create an account",
    body: "Sign up with your email — no card, no setup fee.",
  },
  {
    n: "2",
    title: "Add a transaction",
    body: "Log your first income or expense from the dashboard.",
  },
  {
    n: "3",
    title: "Watch it update",
    body: "Your balance and category breakdown update in real time.",
  },
];

const BADGES = [
  "Free forever",
  "No credit card needed",
  "Your data stays private",
];

export default function LandingPage() {
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFFCFC] text-[#1F1F1F] dark:bg-[#242424] dark:text-gray-200">
      <Header />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-gradient-to-br from-sky-200/50 via-violet-200/40 to-transparent blur-3xl dark:from-sky-800/20 dark:via-violet-800/10 sm:h-96 sm:w-96" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-gradient-to-tr from-emerald-100/50 to-transparent blur-3xl dark:from-emerald-900/10 sm:h-80 sm:w-80" />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-2 md:items-center md:gap-12 md:py-28">
          <div>
            <span className="mb-4 inline-block rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 dark:bg-sky-900/40 dark:text-sky-300 sm:text-sm">
              Personal finance, made simple
            </span>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              Know exactly where your money went.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-500 dark:text-gray-400 sm:mt-6 sm:text-base">
              Track income and expenses, and see your spending broken down into
              colorful, readable charts — no spreadsheets required.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
              <Button
                size="large"
                className="bg-sky-600 !text-gray-50 hover:!bg-sky-600 hover:shadow-lg hover:shadow-sky-600/30 transition-all xs:w-auto"
                icon={<ArrowRightOutlined />}
                iconPosition="end"
                onClick={() =>
                  navigate(isAuthenticated ? "/dashboard" : "/register")
                }
              >
                {isAuthenticated ? "Go to dashboard" : "Get started free"}
              </Button>
              <Button
                size="large"
                href="#how-it-works"
                className="hover:!border-sky-600 hover:!text-sky-600 hover:shadow-lg transition-all dark:!border-gray-600 dark:!text-gray-300 dark:hover:!border-sky-400 dark:hover:!text-sky-400 xs:w-auto"
              >
                See how it works
              </Button>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-400 dark:text-gray-500 sm:mt-8 sm:gap-x-6">
              {BADGES.map((b) => (
                <span key={b} className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />{" "}
                  {b}
                </span>
              ))}
            </div>
          </div>

          <Card className="!bg-white !border-slate-100 shadow-xl shadow-slate-200/60 dark:!bg-[#2b2b2b] dark:!border-gray-700 dark:shadow-black/30">
            <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-gray-700">
              <span className="text-xs font-medium text-slate-500 dark:text-gray-400 sm:text-sm">
                This month
              </span>
              <span className="text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
                ₹24,860
              </span>
            </div>
            {[
              {
                label: "Salary",
                type: "Income",
                amount: "+₹45,000",
                positive: true,
              },
              {
                label: "Rent",
                type: "Expense",
                amount: "−₹14,000",
                positive: false,
              },
              {
                label: "Groceries",
                type: "Expense",
                amount: "−₹4,200",
                positive: false,
              },
              {
                label: "Freelance",
                type: "Income",
                amount: "+₹6,500",
                positive: true,
              },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between border-b border-slate-50 py-2.5 text-xs dark:border-gray-700/60 sm:text-sm"
              >
                <div>
                  <div className="text-slate-800 dark:text-gray-200">
                    {row.label}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-gray-500 sm:text-xs">
                    {row.type}
                  </div>
                </div>
                <span
                  className={
                    row.positive
                      ? "font-medium text-emerald-600 dark:text-emerald-400"
                      : "font-medium text-rose-500 dark:text-rose-400"
                  }
                >
                  {row.amount}
                </span>
              </div>
            ))}
          </Card>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section
        id="features"
        className="border-t border-slate-100 bg-slate-50/60 dark:border-gray-700 dark:bg-[#202020]"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
            Everything you need to stay on budget
          </h2>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2">
            {FEATURES.map((f) => (
              <Card
                key={f.title}
                className="!bg-white !border-slate-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:!bg-[#2b2b2b] dark:!border-gray-700"
              >
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg text-lg ${f.bg} ${f.iconColor}`}
                >
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-gray-400">
                  {f.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section
        id="how-it-works"
        className="border-t border-slate-100 bg-[#FFFCFC] dark:border-gray-700 dark:bg-[#242424]"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
            Three steps, no learning curve
          </h2>
          <div className="mt-8 grid gap-6 sm:mt-10 sm:gap-8 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n}>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-600 text-sm font-semibold text-white">
                  {s.n}
                </div>
                <h3 className="mt-3 text-base font-semibold text-slate-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-gray-400">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      {!isAuthenticated && (
        <section className="border-t border-slate-100 bg-gradient-to-r from-sky-600 to-indigo-600 dark:border-gray-700">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 py-10 sm:px-6 sm:py-16 md:flex-row md:items-center">
            <h2 className="text-xl font-semibold text-white sm:text-2xl md:text-3xl">
              Start tracking your budget today.
            </h2>
            <Button
              size="large"
              className="border-none !bg-white !text-sky-700 outline-none hover:!bg-white hover:shadow-lg hover:shadow-black/10 transition-shadow xs:w-auto"
              onClick={() => navigate("/register")}
            >
              Create a free account
            </Button>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
