import React from "react";
import DynamicList from "./DynamicList.jsx";

export default function OptionFields({
  sideLabel,
  option,
  onUpdate,
  showFileInputs = true,
}) {
  const set = (patch) => onUpdate({ ...option, ...patch });

  const ensureAtLeastOne = (arr) => (arr.length ? arr : [""]);

  const updateListItem = (key, idx, value) => {
    const next = [...option[key]];
    next[idx] = value;
    set({ [key]: next });
  };

  const addAfter = (key, idx) => {
    const next = [...option[key]];
    next.splice(idx + 1, 0, "");
    set({ [key]: next });
  };

  const removeAt = (key, idx) => {
    const next = [...option[key]];
    next.splice(idx, 1);
    set({ [key]: ensureAtLeastOne(next) });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Please upload an image smaller than 2MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") return;

      const current = (option.attachments || []).filter((x) => x.trim() !== "");
      set({ attachments: [...current, result] });
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="optionCol">
      <div className="fieldRow">
        <div className="fieldLabel">{sideLabel}:</div>
        <input
          className="textInput"
          value={option.name}
          onChange={(e) => set({ name: e.target.value })}
          placeholder="Option name"
        />
      </div>

      {showFileInputs && (
        <>
          <DynamicList
            label="Insert file (image data/url)"
            items={ensureAtLeastOne(option.attachments)}
            placeholder="Upload image URL"
            onChangeItem={(i, v) => updateListItem("attachments", i, v)}
            onAddAfter={(i) => addAfter("attachments", i)}
            onRemoveAt={(i) => removeAt("attachments", i)}
          />

          <div className="fieldBlock">
            <div className="fieldLabel">Upload image from computer:</div>
            <input
              className="textInput"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
            />
          </div>
        </>
      )}

      <DynamicList
        label="Links"
        items={ensureAtLeastOne(option.links)}
        placeholder="https://example.com"
        onChangeItem={(i, v) => updateListItem("links", i, v)}
        onAddAfter={(i) => addAfter("links", i)}
        onRemoveAt={(i) => removeAt("links", i)}
      />

      <DynamicList
        label="Pros"
        items={ensureAtLeastOne(option.pros)}
        placeholder="Add a pro"
        onChangeItem={(i, v) => updateListItem("pros", i, v)}
        onAddAfter={(i) => addAfter("pros", i)}
        onRemoveAt={(i) => removeAt("pros", i)}
      />

      <DynamicList
        label="Cons"
        items={ensureAtLeastOne(option.cons)}
        placeholder="Add a con"
        onChangeItem={(i, v) => updateListItem("cons", i, v)}
        onAddAfter={(i) => addAfter("cons", i)}
        onRemoveAt={(i) => removeAt("cons", i)}
      />

      <div className="twoSmallFields">
        <div className="smallField">
          <div className="fieldLabel">Cost:</div>
          <input
            className="textInput"
            value={option.cost}
            onChange={(e) => set({ cost: e.target.value })}
            placeholder="$"
          />
        </div>
        <div className="smallField">
          <div className="fieldLabel">Time:</div>
          <input
            className="textInput"
            value={option.time}
            onChange={(e) => set({ time: e.target.value })}
            placeholder="e.g., 1 month"
          />
        </div>
      </div>

      <div className="fieldRow">
        <div className="fieldLabel">Overall Score:</div>
        <input
          className="textInput"
          value={option.score}
          onChange={(e) => set({ score: e.target.value })}
          placeholder="My score..."
        />
      </div>
    </div>
  );
}
