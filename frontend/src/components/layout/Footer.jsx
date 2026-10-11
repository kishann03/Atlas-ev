import { Link } from "react-router-dom";
import Logo from "@/components/common/Logo";
import resources, { footerGroups } from "@/data/resources";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-surface2">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" aria-label="Atlas EV home"><Logo /></Link>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-text-secondary">
            Find the charger that fits your car, your route and your budget, not just the closest one.
          </p>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h4 className="text-lg font-bold text-text-primary">{group.title}</h4>
            <ul className="mt-4 space-y-3">
              {group.title === "Product" && (
                <li>
                  <Link to="/stations" className="text-base text-text-secondary transition-colors hover:text-accent">
                    Find Chargers
                  </Link>
                </li>
              )}
              {group.slugs.map((slug) => (
                <li key={slug}>
                  <Link to={`/resources/${slug}`} className="text-base text-text-secondary transition-colors hover:text-accent">
                    {resources[slug].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container-page py-5 text-sm text-text-tertiary">
          &copy; {new Date().getFullYear()} Atlas EV. Built in India.
        </div>
      </div>
    </footer>
  );
}
