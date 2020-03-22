import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace) {
    if (replace === true) {
      history.pop();
      console.log("current history without push: ", history);

      //current history without push:  [ 'FIRST', 'SECOND' ]
    }

    //first, second, third gets pushed
    history.push(newMode);
    setMode(history[history.length - 1]);
  }

  function back() {
    if (history.length > 1) {
      history.pop();

      //if arr longer than 1, then pop, becomes first, second
      //set mode to be SECOND with history.length - 1

      setMode(history[history.length - 1]);
      console.log("current history.length - 1: ", history[history.length - 1]);
    }

    // if (history.length === 1) {
    //   setMode(history);
    // }
  }
  return { mode, setMode, transition, back };
}

//   return { mode, setMode, transition, back };
// }

// import React, { useState } from "react";

// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);

//   function transition(second) {
//     setMode(second);
//   }
//   return { mode, transition };
// }

// function back() {
//   if (history.length === 1) {
//     setMode(mode);
//   } else {
//     history.pop();

//     setMode(history[history.length - 1]);
//   }
// }

// import React, { useState } from "react";

// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);

//   const [history, setHistory] = useState([initial]);

//   function transition(newMode, replace) {
//     if (replace === true) {
//       setMode(newMode);

//       console.log("current history without push: ", history);

//       //current history without push:  [ 'FIRST', 'SECOND' ]
//     } else {
//       setMode(newMode);

//       //first, second, third gets pushed
//       history.push(newMode);
//     }
//   }

//   function back() {
//     if (history.length > 1) {
//       history.pop();

//       //if arr longer than 1, then pop, becomes first, second
//       //set mode to be SECOND with history.length - 1

//       setMode(history[history.length - 1]);
//       console.log("current history.length - 1: ", history[history.length - 1]);
//     }

//     // if (history.length === 1) {
//     //   setMode(history);
//     // }
//   }

//   return { mode, setMode, transition, back };
// }
