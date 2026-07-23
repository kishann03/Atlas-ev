import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/common/Logo";
import AuthVisualPanel from "@/components/layout/AuthVisualPanel";

export default function AuthLayout({ children, quote, author, role }) {
  return (
    <div className="grid min-h-screen bg-bg-primary lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <Link to="/" aria-label="Atlas EV home">
            <Logo />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            <ArrowLeft size={15} />
            Back to home
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>

      <AuthVisualPanel quote={quote} author={author} role={role} />
    </div>
  );
}
