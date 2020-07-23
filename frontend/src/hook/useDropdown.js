import React, { useState } from "react";
import "../style/dropdown.css";

export default function useDropdown(options = [], id, initialState = false) {
  const [visible, setVisible] = useState(initialState);

  function Dropdown() {
    return (
      <div className="dropdown" id={id}>
        <button onClick={() => setVisible(!visible)}>
          <svg
            width="32"
            height="15"
            viewBox="0 0 32 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 3L16 11.5L29 3"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="dropdown-content">
          {visible
            ? options.map(({ optionName, handleClick }) => {
                return (
                  <button key={optionName} onClick={handleClick}>
                    {optionName}
                  </button>
                );
              })
            : null}
        </div>
      </div>
    );
  }

  return Dropdown;
}
