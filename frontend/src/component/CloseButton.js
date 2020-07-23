import React from "react";

function CloseButton({ setData }) {
  return (
    <button className="close-modal-btn" onClick={() => setData(null)}>
      <svg
        width="29"
        height="30"
        viewBox="0 0 29 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="2.5"
          y1="-2.5"
          x2="33.109"
          y2="-2.5"
          transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 0 26)"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="3.53553"
          y1="4.4"
          x2="25.1794"
          y2="26.0438"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default CloseButton;
