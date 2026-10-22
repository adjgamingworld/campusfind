import type { CampusItem, ItemCategory, ItemStatus } from "./items";

export type ItemFilters = {
  query: string;
  category: ItemCategory | "all";
  status: ItemStatus | "all";
};

export function filterItems(
  items: CampusItem[],
  { query, category, status }: ItemFilters,
): CampusItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((item) => {
    const matchesQuery = item.name.toLowerCase().includes(normalizedQuery);
    const matchesCategory = category === "all" || item.category === category;
    const matchesStatus = status === "all" || item.status === status;

    return matchesQuery && matchesCategory && matchesStatus;
  });
}
