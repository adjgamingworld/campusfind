"use client";

import { type FormEvent, useState, useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import { ItemCard } from "./item-card";
import { items as sampleItems, type CampusItem, type ItemCategory } from "../lib/items";

const storageKey = "campusfind-reports";
const categories: ItemCategory[] = ["Accessories", "Books & stationery", "Electronics", "ID & keys"];
const subscribe = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("campusfind-reports-change", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("campusfind-reports-change", onStoreChange);
  };
};
const getSnapshot = () => {
  try {
    return window.localStorage.getItem(storageKey) ?? "[]";
  } catch {
    return "[]";
  }
};
const getServerSnapshot = () => "[]";
function parseSavedItems(value: string): CampusItem[] {
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is CampusItem =>
      item !== null && typeof item === "object" &&
      typeof item.id === "string" && typeof item.name === "string" &&
      categories.includes(item.category) && typeof item.location === "string" &&
      (item.status === "Lost" || item.status === "Found") &&
      ["blue", "peach", "lilac", "yellow"].includes(item.art),
    );
  } catch {
    return [];
  }
}

export function ReportExperience() {
  const savedItemsJson = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const savedItems = parseSavedItems(savedItemsJson);
  const items = [...savedItems, ...sampleItems];
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const location = String(data.get("location") ?? "").trim();
    const description = String(data.get("description") ?? "").trim();
    const category = String(data.get("category") ?? "") as ItemCategory;
    const status = String(data.get("status") ?? "") as "Lost" | "Found";

    if (!name || !location || !categories.includes(category) || !["Lost", "Found"].includes(status)) {
      setFormError("Please complete all required fields with a valid category and report type.");
      setSuccessMessage("");
      return;
    }

    const newItem: CampusItem = {
      id: crypto.randomUUID(),
      name,
      category,
      location,
      description: description || undefined,
      reportedAt: "Just now",
      status,
      art: category === "Electronics" ? "blue" : category === "Accessories" ? "peach" : category === "Books & stationery" ? "lilac" : "yellow",
    };
    try {
      window.localStorage.setItem(storageKey, JSON.stringify([newItem, ...savedItems]));
      window.dispatchEvent(new Event("campusfind-reports-change"));
    } catch {
      setFormError("This report could not be saved in this browser. Check your storage settings and try again.");
      return;
    }
    setFormError("");
    setSuccessMessage(`${name} was reported as ${status.toLowerCase()} and added to recent reports.`);
    form.reset();
  }

  return (
    <>
      <div className="item-grid">
        {items.map((item) => <ItemCard item={item} key={item.id} />)}
      </div>
      <p className="mock-data-note">Sample reports are shown alongside reports saved in this browser.</p>

      <section className="report-section" id="report-item" aria-labelledby="report-heading">
        <div className="report-section-intro">
          <p className="eyebrow eyebrow-muted">Help something find its way home</p>
          <h2 id="report-heading">Report a lost or found item</h2>
          <p>Share the details students need to recognize where an item was seen.</p>
        </div>
        <form className="report-form" onSubmit={handleSubmit}>
          <fieldset className="report-type-fieldset">
            <legend>What are you reporting? <span>(required)</span></legend>
            <div className="report-type-options">
              <label><input type="radio" name="status" value="Lost" defaultChecked /> Lost item</label>
              <label><input type="radio" name="status" value="Found" /> Found item</label>
            </div>
          </fieldset>
          <div className="report-form-grid">
            <label className="form-field"><span>Item name <span>(required)</span></span><input name="name" required maxLength={80} placeholder="e.g. Blue water bottle" /></label>
            <label className="form-field"><span>Category <span>(required)</span></span><select name="category" required defaultValue=""><option value="" disabled>Select a category</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
            <label className="form-field"><span>Location <span>(required)</span></span><input name="location" required maxLength={120} placeholder="Where was it lost or found?" /></label>
            <label className="form-field"><span>Description <span>(optional)</span></span><textarea name="description" maxLength={240} rows={3} placeholder="Color, distinguishing marks, or other helpful details" /></label>
          </div>
          {formError && <p className="form-message form-error" role="alert">{formError}</p>}
          {successMessage && <p className="form-message form-success" role="status">{successMessage}</p>}
          <button className="button button-primary report-submit" type="submit">Submit report <ArrowRight aria-hidden="true" size={17} /></button>
        </form>
      </section>
    </>
  );
}
