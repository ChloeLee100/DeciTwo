import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import MainPage from "./pages/MainPage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import ViewPage from "./pages/ViewPage.jsx";
import EditPage from "./pages/EditPage.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const location = useLocation();

  // When Create modal is open, we disable the header create button.
  const isCreateRoute = location.pathname === "/create";

  return (
    <div className="appShell">
      <Header disableCreate={isCreateRoute} />
      <main className="appMain">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/view/:id" element={<ViewPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
