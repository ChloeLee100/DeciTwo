import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header({ disableCreate }) {
  const navigate = useNavigate();
  const location = useLocation();

  const onCreate = () => {
    if (disableCreate) return;
    navigate("/create", { state: { from: location.pathname } });
  };

  return (
    <header className="topBar">
      <section className="container">
        <div className="brand" role="button" tabIndex={0} onClick={() => navigate("/")}>
          <img className="brandLogo" src={logo} alt="DeciTwo logo" />
          <div className="brandName">DeciTwo</div>
        </div>

        <button className="pillBtn" onClick={onCreate} disabled={disableCreate}>
          Create New Comparison
        </button>
      </section>
    </header>
  );
}
