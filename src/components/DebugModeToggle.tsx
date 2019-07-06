import { AppContext } from "..";
import React, { useState, useContext } from "react";

const DebugModeToggle = () => {
  const { isDebugMode, setDebugMode } = useContext(AppContext);

  return (
    <button
      onClick={() => {
        setDebugMode(!isDebugMode);
      }}
    >
      {isDebugMode ? "turn off debug mode" : "turn on debug mode"}
    </button>
  );
};

export default DebugModeToggle;
