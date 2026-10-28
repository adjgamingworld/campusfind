import { ArrowLeft, CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";
import type { CampusItem } from "../lib/items";
import { resolveItem } from "../actions";

export function ItemDetails({ item }: { item: CampusItem }) {
  const currentItem = item;
  const canResolve =
    currentItem.status === "Found" || currentItem.status === "Lost";
  const actionLabel =
    currentItem.status === "Found" ? "Mark as claimed" : "Mark as returned";
  const resolveCurrentItem = resolveItem.bind(null, currentItem.id);

  return (
    <main className="details-page page-shell">
      <Link className="back-link" href="/#recent-reports">
        <ArrowLeft aria-hidden="true" size={17} />
        Back to browsing
      </Link>
      <article className="details-card">
        <div className={`details-art item-art item-art-${currentItem.art}`}>
          <span className={`status-pill status-${currentItem.status.toLowerCase()}`}>
            <span aria-hidden="true" />
            {currentItem.status}
          </span>
          <p>{currentItem.category}</p>
        </div>
        <div className="details-content">
          <p className="eyebrow eyebrow-muted">Campus item report</p>
          <h1>{currentItem.name}</h1>
          <p className="details-description">{currentItem.description}</p>
          <dl className="details-meta">
            <div><dt>Category</dt><dd>{currentItem.category}</dd></div>
            <div><dt>Location</dt><dd><MapPin aria-hidden="true" size={16} />{currentItem.location}</dd></div>
            <div><dt>Reported</dt><dd>{currentItem.reportedAt}</dd></div>
            <div><dt>Current status</dt><dd>{currentItem.status}</dd></div>
          </dl>
          {canResolve ? (
            <form action={resolveCurrentItem}>
              <button className="button button-primary status-action" type="submit"><CheckCircle2 aria-hidden="true" size={17} />{actionLabel}</button>
            </form>
          ) : (
            <p className="status-confirmation" role="status"><CheckCircle2 aria-hidden="true" size={18} />This item has already been {currentItem.status.toLowerCase()}.</p>
          )}
          <p className="demo-persistence-note">Status changes are saved in the local SQLite database.</p>
        </div>
      </article>
    </main>
  );
}
