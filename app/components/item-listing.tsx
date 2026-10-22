"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { filterItems } from "../lib/filter-items";
import type { CampusItem, ItemCategory, ItemStatus } from "../lib/items";
import { ItemCard } from "./item-card";

type ItemListingProps = {
  items: CampusItem[];
};

export function ItemListing({ items }: ItemListingProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ItemCategory | "all">("all");
  const [status, setStatus] = useState<ItemStatus | "all">("all");
  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category))),
    [items],
  );
  const statuses = useMemo(
    () => Array.from(new Set(items.map((item) => item.status))),
    [items],
  );
  const matchingItems = useMemo(
    () => filterItems(items, { query, category, status }),
    [items, query, category, status],
  );
  const hasActiveFilters = query.length > 0 || category !== "all" || status !== "all";

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setStatus("all");
  }

  return (
    <>
      <div className="item-filters" role="search">
        <div className="search-field">
          <Search aria-hidden="true" className="search-icon" size={18} />
          <label className="filter-label" htmlFor="item-search">
            Search item titles
          </label>
          <input
            autoComplete="off"
            id="item-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search item names..."
            type="text"
            value={query}
          />
          {query.length > 0 && (
            <button
              aria-label="Clear search"
              className="clear-search"
              onClick={() => setQuery("")}
              type="button"
            >
              <X aria-hidden="true" size={17} />
            </button>
          )}
        </div>

        <div className="filter-selects">
          <div className="filter-select-wrap">
            <label className="filter-label" htmlFor="item-category">
              Category
            </label>
            <select
              id="item-category"
              onChange={(event) => {
                const selectedCategory = categories.find(
                  (itemCategory) => itemCategory === event.target.value,
                );
                setCategory(selectedCategory ?? "all");
              }}
              value={category}
            >
              <option value="all">All categories</option>
              {categories.map((itemCategory) => (
                <option key={itemCategory} value={itemCategory}>
                  {itemCategory}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-select-wrap">
            <label className="filter-label" htmlFor="item-status">
              Status
            </label>
            <select
              id="item-status"
              onChange={(event) => {
                const selectedStatus = statuses.find(
                  (itemStatus) => itemStatus === event.target.value,
                );
                setStatus(selectedStatus ?? "all");
              }}
              value={status}
            >
              <option value="all">All statuses</option>
              {statuses.map((itemStatus) => (
                <option key={itemStatus} value={itemStatus}>
                  {itemStatus}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="item-results-heading">
        <p aria-live="polite" className="item-results-count">
          Showing {matchingItems.length} of {items.length}{" "}
          {items.length === 1 ? "report" : "reports"}
        </p>
        {hasActiveFilters && (
          <button
            className="clear-filters"
            onClick={clearFilters}
            type="button"
          >
            Clear all filters
          </button>
        )}
      </div>

      {matchingItems.length > 0 ? (
        <div className="item-grid" aria-label="Matching item reports">
          {matchingItems.map((item) => (
            <ItemCard item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <div className="item-empty-state">
          <div className="empty-search-icon" aria-hidden="true">
            <Search size={21} />
          </div>
          <div role="status">
            <h3>No matching items</h3>
            <p>
              Try a different search or adjust your filters to find what you’re
              looking for.
            </p>
          </div>
          <button className="button button-primary" onClick={clearFilters} type="button">
            Clear all filters
          </button>
        </div>
      )}
    </>
  );
}
