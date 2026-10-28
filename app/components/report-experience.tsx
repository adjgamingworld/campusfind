"use client";

import { useActionState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { createReport } from "../actions";
import type { ReportActionState } from "../lib/items";

const initialState: ReportActionState = { error: null, success: null };
const categories = ["Accessories", "Books & stationery", "Electronics", "ID & keys"];

export function ReportExperience() {
  const [state, formAction, isPending] = useActionState(createReport, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state]);

  return (
    <>
      <section className="report-section" id="report-item" aria-labelledby="report-heading">
        <div className="report-section-intro">
          <p className="eyebrow eyebrow-muted">Help something find its way home</p>
          <h2 id="report-heading">Report a lost or found item</h2>
          <p>Share the details students need to recognize where an item was seen.</p>
        </div>
        <form action={formAction} className="report-form" ref={formRef}>
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
          {state.error && <p className="form-message form-error" role="alert">{state.error}</p>}
          {state.success && <p className="form-message form-success" role="status">{state.success}</p>}
          <button className="button button-primary report-submit" disabled={isPending} type="submit">
            {isPending ? "Saving report..." : "Submit report"}
            <ArrowRight aria-hidden="true" size={17} />
          </button>
        </form>
      </section>
    </>
  );
}
