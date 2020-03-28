import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([initial]);

  //transitioning between modes
  function transition(newMode, replace) {
    //if it is true, then jump back two modes
    if (replace === true) {
      history.pop();
    }

    history.push(newMode);
    setMode(history[history.length - 1]);
  }

  //jump back one mode, based on the history state that was set
  function back() {
    if (history.length > 1) {
      history.pop();

      setMode(history[history.length - 1]);
    }
  }
  return { mode, setMode, transition, back };
}
