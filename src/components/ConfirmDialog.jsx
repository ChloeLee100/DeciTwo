import React from "react";
import Modal from "./Modal.jsx";

export default function ConfirmDialog({ title = "Confirm", message, onCancel, onConfirm }) {
  return (
    <Modal title={title} onClose={onCancel} widthClass="modalSmall">
      <div className="confirmText">{message}</div>
      <div className="confirmActions">
        <button className="ghostBtn" onClick={onCancel}>Cancel</button>
        <button className="dangerBtn" onClick={onConfirm}>Delete</button>
      </div>
    </Modal>
  );
}
