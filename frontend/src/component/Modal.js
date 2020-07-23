import React, { useRef } from "react";
import { createPortal } from "react-dom";
import "../style/modal.css";

function Modal({ children, dataAviable }) {
  const elRef = useRef(document.getElementById("modal"));

  const Modal = createPortal(
    dataAviable ? <div className="modal-background">{children}</div> : null,
    elRef.current
  );

  return Modal;
}

export default Modal;
