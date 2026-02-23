import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../components/Modal.jsx";
import ComparisonForm from "../components/ComparisonForm.jsx";
import { loadComparisons, saveComparisons } from "../data/storage.js";
import { makeId } from "../utils/id.js";

function emptyOption(name = "") {
  return {
    name,
    cost: "",
    time: "",
    score: "",
    attachments: [""],
    links: [""],
    pros: [""],
    cons: [""],
  };
}

export default function CreatePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const [draft, setDraft] = useState({
    id: makeId("cmp"),
    title: "",
    category: "",
    updatedAt: Date.now(),
    optionA: emptyOption(""),
    optionB: emptyOption(""),
    notes: "",
  });

  const onClose = () => navigate(from);

  const onSubmit = () => {
    const list = loadComparisons();
    const cleaned = {
      ...draft,
      updatedAt: Date.now(),
      optionA: cleanOption(draft.optionA),
      optionB: cleanOption(draft.optionB),
      notes: draft.notes ?? "",
    };
    const next = [cleaned, ...list]; // newest on top
    saveComparisons(next);
    navigate(`/view/${cleaned.id}`, { replace: true });
  };

  return (
    <Modal title="Create New Comparison" onClose={onClose} widthClass="modalWide">
      <ComparisonForm
        mode="create"
        draft={draft}
        setDraft={setDraft}
        onSubmit={onSubmit}
        submitLabel="Create"
        onClose={onClose}
      />
    </Modal>
  );
}

function cleanOption(opt) {
  const stripEmpty = (arr) => (arr || []).map((s) => s.trim()).filter((s) => s.length > 0);
  return {
    ...opt,
    attachments: stripEmpty(opt.attachments),
    links: stripEmpty(opt.links),
    pros: stripEmpty(opt.pros),
    cons: stripEmpty(opt.cons),
    cost: (opt.cost || "").trim(),
    time: (opt.time || "").trim(),
    score: (opt.score || "").trim(),
    name: (opt.name || "").trim(),
  };
}
