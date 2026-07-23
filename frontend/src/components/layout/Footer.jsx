import { Link } from "react-router-dom";
import { Twitter, Github, Linkedin } from "lucide-react";
import Logo from "@/components/common/Logo";

const COLUMNS = [
  {
    title: "Product",
    links: ["Find Chargers", "Reliability Score", "Cost Comparison", "Vehicle Profiles"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Press"],
  },
  {
    title: "Resources",
    links: ["Help Center", "Network Partners", "API Status", "Community"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-primary">
      <div className="container-page grid grid-cols-2 gap-10 py-16 md:grid-cols-6">
        <div className="col-span-2 md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
            The intelligent charging assistant for EV drivers who want the
            smartest stop, not just the closest one.
          </p>
          <div className="mt-6 flex gap-3">
            {[Twitter, Github, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-text-secondary transition-colors hover:border-accent/40 hover:text-accent"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-text-primary">{col.title}</h4>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-text-secondary transition-colors hover:text-accent"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-page flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-xs text-text-tertiary md:flex-row">
        <p>&copy; {new Date().getFullYear()} Atlas EV. All rights reserved.</p>
        <p>
          Built for drivers who plan ahead. &middot;{" "}
          <Link to="/signup" className="link-accent">
            Get started free
          </Link>
        </p>
      </div>
    </footer>
  );
}
