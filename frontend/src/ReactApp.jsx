// App.jsx

import React, { useState, useEffect } from "react";
// import axios from "axios";

const ReactApp = () => {
  const [globalTranscript, setGlobalTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Check for browser support
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.interimResults = true;
      setRecognition(recognitionInstance);
    } else {
      console.error("Speech recognition is not supported in this browser.");
    }
  }, []);

  const handleStart = () => {
    if (recognition) {
      recognition.start();

      recognition.addEventListener("result", (e) => {
        const transcript = Array.from(e.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");

        setGlobalTranscript(transcript);
      });

      recognition.addEventListener("end", () => {
        console.log(globalTranscript);
        if (globalTranscript !== "") {
          console.log(`spoken words =>`, globalTranscript);
          // console.log(recognition =>, recognition);
          // populateUsingGpt(globalTranscript);
        }
        setGlobalTranscript("");
      });
    }
  };

  const handleStop = () => {
    if (recognition) {
      // Capture the current transcript before stopping
      const finalTranscript = globalTranscript;
      setGlobalTranscript(""); // Clear the transcript for the next session
      recognition.stop();

      if (finalTranscript.trim() !== "") {
        console.log(`spoken words =>`, finalTranscript);
        // You can perform any further actions here with the transcript.
      }
    }
  };

  return (
    <div>
      <nav>
        <h1>AI Interviewer</h1>
      </nav>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
      </div>

      <div>
        <h2>Your Responses</h2>
        {globalTranscript}
      </div>
    </div>
  );
};

export default ReactApp;