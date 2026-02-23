import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="page">
      <h1 className="pageTitle">Page not found</h1>
      <button className="pillBtn" onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
}
