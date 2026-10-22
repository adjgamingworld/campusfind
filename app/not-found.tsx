import { ArrowLeft, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return <main className="not-found-page page-shell"><SearchX aria-hidden="true" size={38} /><p className="eyebrow eyebrow-muted">Item not found</p><h1>We couldn’t find that report.</h1><p>The item may have been removed, or the link may be incorrect.</p><Link className="button button-primary" href="/#recent-reports"><ArrowLeft aria-hidden="true" size={17} />Back to browsing</Link></main>;
}
