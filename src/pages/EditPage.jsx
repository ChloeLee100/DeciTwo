import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal.jsx";
import ComparisonForm from "../components/ComparisonForm.jsx";
import { loadComparisons, saveComparisons } from "../data/storage.js";

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const base = useMemo(() => {
    const all = loadComparisons();
    return all.find((x) => x.id === id) || null;
  }, [id]);

  const [draft, setDraft] = useState(base);

  if (!base || !draft) {
    return (
      <div className="page">
        <h1 className="pageTitle">Not found</h1>
        <button className="pillBtn" onClick={() => navigate("/")}>Back</button>
      </div>
    );
  }

  const onClose = () => navigate(`/view/${id}`);

  const onSubmit = () => {
    const all = loadComparisons();
    const next = all.map((x) =>
      x.id === id
        ? {
            ...draft,
            updatedAt: Date.now(),
            optionA: cleanOption(draft.optionA),
            optionB: cleanOption(draft.optionB),
            notes: draft.notes ?? "",
          }
        : x
    );
    saveComparisons(next);
    navigate(`/view/${id}`, { replace: true });
  };

  return (
    <Modal title="Edit Comparison" onClose={onClose} widthClass="modalWide">
      <ComparisonForm
        mode="edit"
        draft={draft}
        setDraft={setDraft}
        onSubmit={onSubmit}
        submitLabel="Save"
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
