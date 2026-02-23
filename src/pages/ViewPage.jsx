import React, { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadComparisons, saveComparisons } from "../data/storage.js";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import { exportElementToPdf } from "../utils/pdf.js";

export default function ViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const printRef = useRef(null);

  const [showDelete, setShowDelete] = useState(false);

  const item = useMemo(() => {
    const all = loadComparisons();
    return all.find((x) => x.id === id) || null;
  }, [id]);

  if (!item) {
    return (
      <div className="page">
        <h1 className="pageTitle">Not found</h1>
        <button className="pillBtn" onClick={() => navigate("/")}>Back</button>
      </div>
    );
  }

  const onDelete = () => {
    const all = loadComparisons();
    const next = all.filter((x) => x.id !== id);
    saveComparisons(next);
    navigate("/", { replace: true });
  };

  const renderOption = (opt) => {
    const hasFiles = opt.attachments && opt.attachments.length > 0;
    const hasLinks = opt.links && opt.links.length > 0;

    return (
      <div className="viewCol">
        <div className="viewColTitle">{opt.name}</div>

        <div className="viewBlock">
          {hasFiles && (
            <div className="viewSection">
              <div className="viewLabel">File:</div>
              {opt.attachments.map((a, idx) => (
                <div className="viewText" key={idx}>
                  {isProbablyImageData(a) ? (
                    <img className="thumbImg" src={a} alt={`${opt.name} attachment`} />
                  ) : (
                    <span className="mono">{a}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {hasLinks && (
            <div className="viewSection">
              <div className="viewLabel">Link:</div>
              {opt.links.map((l, idx) => (
                <div className="viewText" key={idx}>
                  <a href={l} target="_blank" rel="noreferrer">{l}</a>
                </div>
              ))}
            </div>
          )}

          <hr className="thinLine" />

          <div className="viewSection">
            <div className="viewLabel">Pros:</div>
            <ol className="viewList">
              {(opt.pros || []).map((p, idx) => <li key={idx}>{p}</li>)}
            </ol>
          </div>

          <div className="viewSection">
            <div className="viewLabel">Cons:</div>
            <ol className="viewList">
              {(opt.cons || []).map((c, idx) => <li key={idx}>{c}</li>)}
            </ol>
          </div>

          <div className="viewSection">
            {opt.cost && <div className="viewText"><b>Cost:</b> {opt.cost}</div>}
            {opt.time && <div className="viewText"><b>Time:</b> {opt.time}</div>}
          </div>

          <div className="viewScore">
            <div className="viewLabel">Overall Score:</div>
            <div className="scoreBadge">{opt.score || "-"}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="page">
      <div className="viewTopRow">
        <div>
          <h1 className="pageTitle">{item.title}</h1>
          <div className="subtle">Category: {item.category}</div>
        </div>

        <div className="viewActions">
          <button className="pillBtn" onClick={() => navigate(`/edit/${item.id}`)}>Edit</button>
          <button className="pillBtn danger" onClick={() => setShowDelete(true)}>Delete</button>
        </div>
      </div>

      <div className="contentCard" ref={printRef}>
        <div className="twoColView">
          {renderOption(item.optionA)}
          {renderOption(item.optionB)}
        </div>

        {item.notes?.trim() && (
          <>
            <hr className="thinLine" />
            <div className="notesLine">
              <b>Note:</b> {item.notes}
            </div>
          </>
        )}
      </div>

      <div className="bottomRow">
        <button
          className="pillBtn"
          onClick={() => exportElementToPdf(printRef.current, `DeciTwo_${item.title}.pdf`)}
        >
          Export to PDF
        </button>
      </div>

      {showDelete && (
        <ConfirmDialog
          title="Delete comparison"
          message="Are you sure you want to delete this comparison? This cannot be undone."
          onCancel={() => setShowDelete(false)}
          onConfirm={onDelete}
        />
      )}
    </div>
  );
}

function isProbablyImageData(value) {
  return typeof value === "string" && value.startsWith("data:image/");
}
