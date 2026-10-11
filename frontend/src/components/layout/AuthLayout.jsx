import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";
import AuthVisualPanel from "@/components/layout/AuthVisualPanel";

export default function AuthLayout({ children, quote, author, role }) {
  return (
    <div className="grid min-h-screen bg-bg-primary lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col px-6 py-8 sm:px-12 lg:px-20">
        <div className="flex items-center justify-between">
          <Link to="/" aria-label="Atlas EV home"><Logo /></Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="hidden items-center gap-2 text-base font-medium text-text-secondary hover:text-text-primary sm:flex">
              <ArrowLeft size={18} /> Back to home
            </Link>
            <ThemeToggle />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-lg">{children}</div>
        </div>
      </div>
      <AuthVisualPanel quote={quote} author={author} role={role} />
    </div>
  );
}
