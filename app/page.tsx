import {
  ArrowDown,
  ArrowRight,
  HeartHandshake,
  MapPin,
  PackageOpen,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { ItemCard } from "./components/item-card";
import { SiteHeader } from "./components/site-header";
import { items } from "./lib/items";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="hero-inner page-shell">
            <div className="hero-copy">
              <p className="eyebrow">
                <Sparkles aria-hidden="true" size={15} />
                Your campus, a little more connected
              </p>
              <h1>
                Lost something?
                <br />
                <span>Let’s find its way home.</span>
              </h1>
              <p className="hero-description">
                CampusFind brings lost and found reports together, so the things
                that matter can make their way back to you.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#recent-reports">
                  Browse recent reports
                  <ArrowRight aria-hidden="true" size={17} />
                </a>
                <a className="text-link" href="#contribute">
                  How it works
                  <ArrowDown aria-hidden="true" size={15} />
                </a>
              </div>
              <div className="hero-note">
                <span className="hero-note-icon" aria-hidden="true">
                  <UsersRound size={20} />
                </span>
                <p>
                  A small campus community
                  <br />
                  helping each other out.
                </p>
              </div>
            </div>

            <div
              className="hero-art"
              role="img"
              aria-label={`Sample ${items[0].status.toLowerCase()} item report: ${items[0].name} at ${items[0].location}`}
            >
              <div className="art-sun" />
              <div className="art-orbit art-orbit-one" />
              <div className="art-orbit art-orbit-two" />
              <div className="art-leaf art-leaf-one" />
              <div className="art-leaf art-leaf-two" />
              <div className="hero-pin">
                <MapPin aria-hidden="true" size={27} strokeWidth={2.3} />
              </div>
              <div className="hero-report">
                <div className="report-icon">
                  <PackageOpen aria-hidden="true" size={39} strokeWidth={1.7} />
                </div>
                <div className="report-content">
                  <span
                    className={`status-pill status-${items[0].status.toLowerCase()}`}
                  >
                    {items[0].status}
                  </span>
                  <h2>{items[0].name}</h2>
                  <p>
                    <MapPin aria-hidden="true" size={13} />
                    {items[0].location}
                  </p>
                </div>
                <div className="report-sparkle" aria-hidden="true">
                  <HeartHandshake size={19} />
                </div>
              </div>
              <p className="art-caption">One kind find can make someone’s day.</p>
            </div>
          </div>
          <div className="hero-bottom page-shell">
            <span>MADE FOR CAMPUS LIFE</span>
            <span className="hero-bottom-line" />
            <span>GOOD THINGS FIND THEIR WAY BACK</span>
          </div>
        </section>

        <section className="reports-section page-shell" id="recent-reports">
          <div className="section-heading">
            <div>
              <p className="eyebrow eyebrow-muted">A helping hand starts here</p>
              <h2>Browse lost & found items</h2>
              <p className="section-description">
                Browse all {items.length} sample reports from around campus.
              </p>
            </div>
            <a className="section-link" href="#contribute">
              Explore the project
              <ArrowRight aria-hidden="true" size={16} />
            </a>
          </div>

          <div className="item-grid">
            {items.map((item) => (
              <ItemCard item={item} key={item.id} />
            ))}
          </div>
          <p className="mock-data-note">
            These are sample reports — no real items or students are shown.
          </p>
        </section>

        <section className="community-section" id="contribute">
          <div className="community-inner page-shell">
            <div className="community-icon">
              <HeartHandshake aria-hidden="true" size={26} />
            </div>
            <div className="community-copy">
              <p className="eyebrow eyebrow-light">Built together, for campus</p>
              <h2>There’s room for your next good idea.</h2>
              <p>
                CampusFind is an open-source student project. Search, report submission, and item details are upcoming features for contributors to build.
              </p>
            </div>
            <a
              className="button button-light"
              href="https://github.com/adjgamingworld/campusfind"
              target="_blank"
              rel="noreferrer"
            >
              Explore the project
              <ArrowRight aria-hidden="true" size={17} />
            </a>
          </div>
        </section>
      </main>
      <footer className="site-footer page-shell">
        <a className="brand footer-brand" href="#" aria-label="CampusFind home">
          <span className="brand-mark" aria-hidden="true">
            <MapPin size={18} strokeWidth={2.4} />
          </span>
          <span>Campus<span className="brand-accent">Find</span></span>
        </a>
        <p>Good things find their way back.</p>
        <a href="https://github.com/adjgamingworld/campusfind">
          Open source, made on campus
        </a>
      </footer>
    </>
  );
}
