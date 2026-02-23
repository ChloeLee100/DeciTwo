import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ComparisonCard from "../components/ComparisonCard.jsx";
import { loadComparisons, saveComparisons } from "../data/storage.js";
import { getSeedComparisons } from "../data/seed.js";

export default function MainPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loaded = loadComparisons();
    if (loaded.length === 0) {
      const seeded = getSeedComparisons();
      saveComparisons(seeded);
      setItems(seeded);
    } else {
      setItems(loaded);
    }
  }, []);

  const persist = (next) => {
    setItems(next);
    saveComparisons(next);
  };

  const move = (index, dir) => {
    const next = [...items];
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= next.length) return;
    const [picked] = next.splice(index, 1);
    next.splice(newIndex, 0, picked);
    persist(next);
  };

  return (
    <div className="page">
      <div className="pageTitleRow">
        <h1 className="pageTitle">My Comparisons</h1>

        {/* <div className="reorderHint" title="Reorder list">
          <button className="iconBtn" onClick={() => {  }} aria-label="Reorder icon">
            ⌃⌄
          </button>
        </div> */}
      </div>

      <div className="list">
        {items.map((it, idx) => (
          <div className="listRow" key={it.id}>
            <ComparisonCard item={it} onClick={() => navigate(`/view/${it.id}`)} />

            <div className="reorderButtons">
              <button className="miniBtn" onClick={() => move(idx, -1)} disabled={idx === 0} title="Move up">
                ↑
              </button>
              <button
                className="miniBtn"
                onClick={() => move(idx, +1)}
                disabled={idx === items.length - 1}
                title="Move down"
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
