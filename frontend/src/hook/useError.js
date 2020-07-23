import React, { useState } from "react";

export default function useError() {
  const [error, setError] = useState("");

  function getError() {
    if (error === "") return () => null;
    // eslint-disable-next-line react/display-name
    return () => (
      <div className="error">
        <span>{error}</span>
      </div>
    );
  }

  return [getError(), setError];
}
