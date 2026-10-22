"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import { items, type CampusItem, type ItemStatus } from "../lib/items";

const storageKey = "campusfind-demo-item-statuses";

type ItemStatusContextValue = {
  items: CampusItem[];
  getItem: (id: string) => CampusItem | undefined;
  resolveItem: (id: string) => void;
};

const ItemStatusContext = createContext<ItemStatusContextValue | null>(null);
let currentItems = items;
let hasReadStorage = false;
const listeners = new Set<() => void>();

function isItemStatus(value: unknown): value is ItemStatus {
  return value === "Lost" || value === "Found" || value === "Claimed" || value === "Returned";
}

function readStoredStatuses(): Record<string, ItemStatus> {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return {};

    const parsed: unknown = JSON.parse(stored);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([id, status]) => items.some((item) => item.id === id) && isItemStatus(status),
      ),
    );
  } catch {
    return {};
  }
}

function applyStatuses(statuses: Record<string, ItemStatus>) {
  return items.map((item) => ({ ...item, status: statuses[item.id] ?? item.status }));
}

function getSnapshot() {
  if (!hasReadStorage) {
    currentItems = applyStatuses(readStoredStatuses());
    hasReadStorage = true;
  }
  return currentItems;
}

function getServerSnapshot() {
  return items;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === storageKey) {
      currentItems = applyStatuses(readStoredStatuses());
      listeners.forEach((notify) => notify());
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

export function ItemStatusProvider({ children }: { children: React.ReactNode }) {
  const resolvedItems = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo<ItemStatusContextValue>(
    () => ({
      items: resolvedItems,
      getItem: (id) => resolvedItems.find((item) => item.id === id),
      resolveItem: (id) => {
        const item = currentItems.find((candidate) => candidate.id === id);
        if (!item || (item.status !== "Found" && item.status !== "Lost")) return;

        const nextStatus: ItemStatus = item.status === "Found" ? "Claimed" : "Returned";
        currentItems = currentItems.map((candidate) =>
          candidate.id === id ? { ...candidate, status: nextStatus } : candidate,
        );

        try {
          const statuses = Object.fromEntries(currentItems.map((candidate) => [candidate.id, candidate.status]));
          window.localStorage.setItem(storageKey, JSON.stringify(statuses));
        } catch {
          // Status changes still work for this session if storage is unavailable.
        }
        listeners.forEach((notify) => notify());
      },
    }),
    [resolvedItems],
  );

  return <ItemStatusContext.Provider value={value}>{children}</ItemStatusContext.Provider>;
}

export function useItemStatuses() {
  const context = useContext(ItemStatusContext);
  if (!context) throw new Error("useItemStatuses must be used within ItemStatusProvider");
  return context;
}
