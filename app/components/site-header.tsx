import { ArrowUpRight, MapPin } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner page-shell">
        <a className="brand" href="#" aria-label="CampusFind home">
          <span className="brand-mark" aria-hidden="true">
            <MapPin size={18} strokeWidth={2.4} />
          </span>
          <span>
            Campus<span className="brand-accent">Find</span>
          </span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#recent-reports">Browse items</a>
          <a className="nav-report" href="#report-item">
            Report an item
            <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        </nav>
      </div>
    </header>
  );
}
