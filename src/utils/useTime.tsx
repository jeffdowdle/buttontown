import React, { useState, useEffect } from "react";

const poll = (fn, waitMillis) => {
  return setTimeout(function() {
    fn();
    poll(fn, waitMillis);
  }, waitMillis);
};

export const useTime = () => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const timeout = poll(() => {
      setTime(Date.now());
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  });

  return time;
};
