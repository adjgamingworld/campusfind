import {
  BookOpen,
  Headphones,
  KeyRound,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import type { CampusItem } from "../lib/items";

const categoryIcons: Record<CampusItem["category"], LucideIcon> = {
  Accessories: Headphones,
  "Books & stationery": BookOpen,
  Electronics: Smartphone,
  "ID & keys": KeyRound,
};

type ItemCardProps = {
  item: CampusItem;
};

export function ItemCard({ item }: ItemCardProps) {
  const Icon = categoryIcons[item.category];

  return (
    <article className="item-card">
      <div className={`item-art item-art-${item.art}`}>
        <span className={`status-pill status-${item.status.toLowerCase()}`}>
          <span aria-hidden="true" />
          {item.status}
        </span>
        <div className="item-art-icon" aria-hidden="true">
          <Icon size={43} strokeWidth={1.45} />
        </div>
        <span className="item-art-category">{item.category}</span>
      </div>
      <div className="item-card-content">
        <div className="item-card-heading">
          <h3>{item.name}</h3>
          <span>{item.reportedAt}</span>
        </div>
        <p className="item-location">
          <span className="location-icon" aria-hidden="true" />
          {item.location}
        </p>
        {item.description && <p className="item-description">{item.description}</p>}
      </div>
    </article>
  );
}
