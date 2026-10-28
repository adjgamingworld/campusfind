"use server";

import { revalidatePath } from "next/cache";
import { createItem, resolveItem as resolveDatabaseItem } from "./lib/database";
import {
  type CampusItem,
  type ItemCategory,
  type ReportActionState,
} from "./lib/items";

const categories: ItemCategory[] = [
  "Accessories",
  "Books & stationery",
  "Electronics",
  "ID & keys",
];

function isItemCategory(value: string): value is ItemCategory {
  return categories.some((category) => category === value);
}

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function artForCategory(category: ItemCategory): CampusItem["art"] {
  switch (category) {
    case "Electronics":
      return "blue";
    case "Accessories":
      return "peach";
    case "Books & stationery":
      return "lilac";
    case "ID & keys":
      return "yellow";
  }
}

export async function createReport(
  _previousState: ReportActionState,
  formData: FormData,
): Promise<ReportActionState> {
  const name = getString(formData, "name");
  const location = getString(formData, "location");
  const description = getString(formData, "description");
  const category = getString(formData, "category");
  const status = getString(formData, "status");

  if (
    !name ||
    name.length > 80 ||
    !location ||
    location.length > 120 ||
    description.length > 240 ||
    !isItemCategory(category) ||
    (status !== "Lost" && status !== "Found")
  ) {
    return {
      error: "Please enter valid report details and complete all required fields.",
      success: null,
    };
  }

  createItem({
    id: crypto.randomUUID(),
    name,
    category,
    location,
    description: description || undefined,
    status,
    art: artForCategory(category),
  });

  revalidatePath("/");
  return {
    error: null,
    success: `${name} was reported as ${status.toLowerCase()} and added to recent reports.`,
  };
}

export async function resolveItem(id: string): Promise<void> {
  if (!resolveDatabaseItem(id)) {
    throw new Error("This item could not be updated because it is missing or already resolved.");
  }

  revalidatePath("/");
  revalidatePath("/items/[id]", "page");
}
