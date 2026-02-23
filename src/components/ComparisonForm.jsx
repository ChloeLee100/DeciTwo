import React, { useMemo } from "react";
import OptionFields from "./OptionFields.jsx";

const CATEGORIES = ["Purchase", "Career", "Living", "Study", "Other"];

export default function ComparisonForm({
  mode, // "create" or "edit"
  draft,
  setDraft,
  onSubmit,
  submitLabel,
  onClose,
}) {
  const requiredOk = useMemo(() => {
    return (
      draft.title.trim().length > 0 &&
      draft.category.trim().length > 0 &&
      draft.optionA.name.trim().length > 0 &&
      draft.optionB.name.trim().length > 0
    );
  }, [draft]);

  const set = (patch) => setDraft((prev) => ({ ...prev, ...patch }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!requiredOk) return;
        onSubmit();
      }}
      className="comparisonForm"
    >
      <div className="formTop">
        <div className="fieldRow">
          <div className="fieldLabel">Title * :</div>
          <input
            className="textInput"
            value={draft.title}
            onChange={(e) => set({ title: e.target.value })}
            placeholder="Comparison title"
          />
        </div>

        <div className="fieldRow">
          <div className="fieldLabel">Category * :</div>
          <select
            className="selectInput"
            value={draft.category}
            onChange={(e) => set({ category: e.target.value })}
          >
            <option value="">Select...</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="dividerLine" />

      <div className="twoColGrid">
        <OptionFields
          sideLabel="Option A * "
          option={draft.optionA}
          onUpdate={(nextA) => set({ optionA: nextA })}
        />
        <OptionFields
          sideLabel="Option B * "
          option={draft.optionB}
          onUpdate={(nextB) => set({ optionB: nextB })}
        />
      </div>

      <div className="notesBlock">
        <div className="fieldLabel">Notes:</div>
        <textarea
          className="textArea"
          value={draft.notes}
          onChange={(e) => set({ notes: e.target.value })}
          placeholder="Optional notes"
        />
      </div>

      <div className="formActions">
        <button type="button" className="ghostBtn" onClick={onClose}>
          Close
        </button>

        <button type="submit" className="pillBtn" disabled={!requiredOk}>
          {submitLabel}
        </button>
      </div>

      {!requiredOk && (
        <div className="hintText">
          Required: Title, Category, Option A name, Option B name.
        </div>
      )}
    </form>
  );
}
