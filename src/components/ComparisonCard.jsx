import React from "react";
import { timeAgo } from "../utils/date.js";

export default function ComparisonCard({ item, onClick }) {
  return (
    <button className="card" onClick={onClick}>
      <div className="cardMain">
        <div className="cardTitle">{item.title}</div>
        <div className="cardSub">
          <span className="vsText">{item.optionA.name}</span>
          <span className="vsSep">VS</span>
          <span className="vsText">{item.optionB.name}</span>
        </div>
        <div className="cardMeta">
          <span>Category: {item.category}</span>
          <span className="metaSep">|</span>
          <span>Last updated {timeAgo(item.updatedAt)}</span>
        </div>
      </div>
      <div className="cardChevron">›</div>
    </button>
  );
}
