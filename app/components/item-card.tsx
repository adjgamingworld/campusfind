"use client";

import {
  BookOpen,
  Headphones,
  KeyRound,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import type { CampusItem } from "../lib/items";
import { useItemStatuses } from "./item-status-provider";

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
  const { getItem } = useItemStatuses();
  const currentItem = getItem(item.id) ?? item;
  const Icon = categoryIcons[currentItem.category];

  return (
    <Link
      className="item-card-link"
      href={`/items/${currentItem.id}`}
      aria-label={`View details for ${currentItem.name}`}
    >
      <article className="item-card">
        <div className={`item-art item-art-${currentItem.art}`}>
          <span className={`status-pill status-${currentItem.status.toLowerCase()}`}>
            <span aria-hidden="true" />
            {currentItem.status}
          </span>
          <div className="item-art-icon" aria-hidden="true">
            <Icon size={43} strokeWidth={1.45} />
          </div>
          <span className="item-art-category">{currentItem.category}</span>
        </div>
        <div className="item-card-content">
          <div className="item-card-heading">
            <h3>{currentItem.name}</h3>
            <span>{currentItem.reportedAt}</span>
          </div>
          <p className="item-location">
            <span className="location-icon" aria-hidden="true" />
            {currentItem.location}
          </p>
        </div>
      </article>
    </Link>
  );
}
