import React from 'react'

const AppTest = () => {
  return (
    <div>AppTest</div>
  )
}

export default AppTest



// -------------------------------
// V1 BASIC SETUP
import React from 'react'

const AppTest = () => {
  return (
    <div>AppTest</div>
  )
}

export default AppTest
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AiInterviewer = () => {
//   const [globalTranscript, setGlobalTranscript] = useState("");
//   const [recognition, setRecognition] = useState(null);

//   useEffect(() => {
//     // Check for browser support
//     if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
//       const SpeechRecognition =
//         window.SpeechRecognition || window.webkitSpeechRecognition;
//       const recognitionInstance = new SpeechRecognition();
//       recognitionInstance.interimResults = true;
//       setRecognition(recognitionInstance);
//     } else {
//       console.error("Speech recognition is not supported in this browser.");
//     }
//   }, []);

//   const handleStart = () => {
//     if (recognition) {
//       recognition.start();

//       recognition.addEventListener("result", (e) => {
//         const transcript = Array.from(e.results)
//           .map((result) => result[0])
//           .map((result) => result.transcript)
//           .join("");

//         setGlobalTranscript(transcript);
//       });

//       recognition.addEventListener("end", () => {
//         console.log(globalTranscript);
//         if (globalTranscript !== "") {
//           console.log(`spoken words =>`, globalTranscript);
//           // console.log(`recognition =>`, recognition);
//           // populateUsingGpt(globalTranscript);
//         }
//         setGlobalTranscript("");
//       });
//     }
//   };

//   const handleStop = () => {
//     if (recognition) {
//       // Capture the current transcript before stopping
//       const finalTranscript = globalTranscript;
//       setGlobalTranscript(""); // Clear the transcript for the next session
//       recognition.stop();

//       if (finalTranscript.trim() !== "") {
//         console.log(`spoken words =>`, finalTranscript);
//         // You can perform any further actions here with the transcript.
//       }
//     }
//   };

//   return (
//     <div>
//       <nav>
//         <h1>AI Interviewer</h1>
//       </nav>
//       <div>
//         <button onClick={handleStart}>Start</button>
//         <button onClick={handleStop}>Stop</button>
//       </div>

//       <div>
//         <h2>Your Responses</h2>
//         {globalTranscript}
//       </div>
//     </div>
//   );
// };

// export default AiInterviewer;

// -------------------------------
// V2 - only one issue is that the recording stops automatically
// rather than me hitting the stop button

// import React, { useState, useEffect } from "react";

// const AiInterviewer = () => {
//   const [globalTranscript, setGlobalTranscript] = useState("");
//   const [recognition, setRecognition] = useState(null);

//   useEffect(() => {
//     if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
//       const SpeechRecognition =
//         window.SpeechRecognition || window.webkitSpeechRecognition;
//       const recognitionInstance = new SpeechRecognition();
//       recognitionInstance.interimResults = true;

//       recognitionInstance.addEventListener("result", (e) => {
//         const interimTranscript = Array.from(e.results)
//           .map((result) => result[0])
//           .map((result) => result.transcript)
//           .join("");

//         setGlobalTranscript(interimTranscript);
//       });

//       recognitionInstance.addEventListener("end", () => {
//         // Check if the recognition is not stopped manually
//         if (globalTranscript.trim() !== "") {
//           console.log(`spoken words =>`, globalTranscript);
//           // You can perform any further actions here with the transcript.
//         }

//         // If recognition ends, start it again
//         if (recognitionInstance.continuous) {
//           recognitionInstance.start();
//         }
//       });

//       setRecognition(recognitionInstance);
//     } else {
//       console.error("Speech recognition is not supported in this browser.");
//     }
//   }, [globalTranscript]); // Add globalTranscript to dependencies

//   const handleStart = () => {
//     if (recognition) {
//       recognition.start();
//     }
//   };

//   const handleStop = () => {
//     if (recognition) {
//       recognition.continuous = false; // Stop continuous listening
//       recognition.stop();
//     }
//   };

//   return (
//     <div>
//       <nav>
//         <h1>AI Interviewer</h1>
//       </nav>
//       <div>
//         <button onClick={handleStart} type="button">
//           Start
//         </button>
//         <button onClick={handleStop} type="button">
//           Stop
//         </button>
//       </div>

//       <div>
//         <h2>Your Responses</h2>
//         {/* Use a textarea to display the transcript */}
//         <textarea rows="4" cols="50" value={globalTranscript} readOnly />
//       </div>
//     </div>
//   );
// };

// export default AiInterviewer;

// -------------------------------
// V3 - it works

// import React, { useState, useEffect } from "react";

// const App = () => {
//   const [recognition, setRecognition] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);

//   useEffect(() => {
//     const initSpeechRecognition = () => {
//       const recognition = new window.webkitSpeechRecognition();

//       recognition.continuous = true;
//       recognition.onresult = (event) => {
//         const transcript =
//           event.results[event.results.length - 1][0].transcript;
//         console.log(transcript);
//       };

//       setRecognition(recognition);
//     };

//     initSpeechRecognition();
//   }, []);

//   const handleStart = () => {
//     if (recognition) {
//       recognition.start();
//       setIsRecording(true);
//     }
//   };

//   const handleStop = () => {
//     if (recognition) {
//       recognition.stop();
//       setIsRecording(false);
//       console.log("Recording stopped.");
//     }
//   };

//   return (
//     <div>
//       <h1>AI interviewer</h1>
//       <button onClick={handleStart} disabled={isRecording}>
//         Start
//       </button>
//       <button onClick={handleStop} disabled={!isRecording}>
//         Stop
//       </button>
//     </div>
//   );
// };

// export default App;

// --------------------------
// V4 - works flawlessly

// import React, { useState, useEffect } from "react";

// const App = () => {
//   const [recognition, setRecognition] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [userContent, setUserContent] = useState("");

//   useEffect(() => {
//     const initSpeechRecognition = () => {
//       const recognition = new window.webkitSpeechRecognition();

//       recognition.continuous = true;
//       recognition.onresult = (event) => {
//         const transcript =
//           event.results[event.results.length - 1][0].transcript;
//         setUserContent((prevContent) => prevContent + transcript);
//       };

//       setRecognition(recognition);
//     };

//     initSpeechRecognition();
//   }, []);

//   const handleStart = () => {
//     if (recognition) {
//       recognition.start();
//       setIsRecording(true);
//     }
//   };

//   const handleStop = () => {
//     if (recognition) {
//       recognition.stop();
//       setIsRecording(false);
//       console.log("Recording stopped. Content:", userContent);
//     }
//   };

//   return (
//     <div>
//       <h1>AI interviewer</h1>
//       <div>
//         <button onClick={handleStart} disabled={isRecording}>
//           Start
//         </button>
//         <button onClick={handleStop} disabled={!isRecording}>
//           Stop
//         </button>
//       </div>
//       <div>
//         <p>User Content: {userContent}</p>
//       </div>
//     </div>
//   );
// };

// export default App;

// // -----------------------------
// // V5 - along with STT; TTS functionality added

// import React, { useState, useEffect } from "react";

// const App = () => {
//   const [recognition, setRecognition] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [userContent, setUserContent] = useState("");

//   useEffect(() => {
//     const initSpeechRecognition = () => {
//       const recognition = new window.webkitSpeechRecognition();

//       recognition.continuous = true;
//       recognition.onresult = (event) => {
//         const transcript =
//           event.results[event.results.length - 1][0].transcript;
//         setUserContent((prevContent) => prevContent + " " + transcript);
//       };

//       setRecognition(recognition);
//     };

//     initSpeechRecognition();
//   }, []);

//   const handleStart = () => {
//     if (recognition) {
//       recognition.start();
//       setIsRecording(true);
//     }
//   };

//   const handleStop = () => {
//     if (recognition) {
//       recognition.stop();
//       setIsRecording(false);

//       // Text-to-speech conversion
//       if (userContent) {
//         const utterance = new SpeechSynthesisUtterance(userContent);
//         window.speechSynthesis.speak(utterance);
//       }

//       console.log("Recording stopped. Content:", userContent);
//     }
//   };

//   return (
//     <div>
//       <h1>EI interviewer</h1>
//       <div>
//         <button onClick={handleStart} disabled={isRecording}>
//           Start
//         </button>
//         <button onClick={handleStop} disabled={!isRecording}>
//           Stop
//         </button>
//       </div>
//       <div>
//         <p>User Content: {userContent}</p>
//       </div>
//     </div>
//   );
// };

// export default App;

// -----------------------------
// V6 - TTS variation

// import React, { useState, useEffect } from "react";

// const App = () => {
//   const [recognition, setRecognition] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [userContent, setUserContent] = useState("");

//   useEffect(() => {
//     const initSpeechRecognition = () => {
//       const recognition = new window.webkitSpeechRecognition();

//       recognition.continuous = true;
//       recognition.onresult = (event) => {
//         const transcript =
//           event.results[event.results.length - 1][0].transcript;
//         setUserContent((prevContent) => prevContent + " " + transcript);
//       };

//       setRecognition(recognition);
//     };

//     initSpeechRecognition();
//   }, []);

//   const handleStart = () => {
//     if (recognition) {
//       recognition.start();
//       setIsRecording(true);
//     }
//   };

//   const handleStop = () => {
//     if (recognition) {
//       recognition.stop();
//       setIsRecording(false);

//       // Text-to-speech conversion
//       if (userContent) {
//         const utterance = new SpeechSynthesisUtterance(userContent);

//         // Fetch and set a different voice
//         const voices = window.speechSynthesis.getVoices();
//         utterance.voice = voices.find(
//           (voice) => voice.name === "Your Desired Voice Name"
//         );

//         // Adjust other properties if needed
//         utterance.rate = 1.0; // Adjust the speed (1.0 is the default)
//         utterance.pitch = 1.0; // Adjust the pitch (1.0 is the default)

//         window.speechSynthesis.speak(utterance);
//       }

//       console.log("Recording stopped. Content:", userContent);
//     }
//   };

//   return (
//     <div>
//       <h1>EI interviewer</h1>
//       <div>
//         <button onClick={handleStart} disabled={isRecording}>
//           Start
//         </button>
//         <button onClick={handleStop} disabled={!isRecording}>
//           Stop
//         </button>
//       </div>
//       <div>
//         <p>User Content: {userContent}</p>
//       </div>
//     </div>
//   );
// };

// export default App;

// // -------------------------------------------
// // V4 - connected to backend and has TTS

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AppTest = () => {
//   const [recognition, setRecognition] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [userContent, setUserContent] = useState("");

//   useEffect(() => {
//     const initSpeechRecognition = () => {
//       const recognition = new window.webkitSpeechRecognition();

//       recognition.continuous = true;
//       recognition.onresult = (event) => {
//         const transcript =
//           event.results[event.results.length - 1][0].transcript;
//         setUserContent((prevContent) => prevContent + transcript);
//       };

//       setRecognition(recognition);
//     };

//     initSpeechRecognition();
//   }, []);

//   const handleStart = () => {
//     if (recognition) {
//       recognition.start();
//       setIsRecording(true);
//     }
//   };

//   const handleStop = async () => {
//     if (recognition) {
//       recognition.stop();
//       setIsRecording(false);
//       console.log("Recording stopped. Content:", userContent);
//     }

//     // Send a POST request using Axios
//     try {
//       const response = await axios.post("http://localhost:5000/api/chat", {
//         messages: [
//           {
//             content: userContent,
//           },
//         ],
//       });

//       console.log("POST request successful!", response.data);

//       // Clear user content after successful POST
//       setUserContent("");
//     } catch (error) {
//       console.error("Error in Axios POST request:", error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>AI interviewer</h1>
//       <div>
//         <button onClick={handleStart} disabled={isRecording}>
//           Start
//         </button>
//         <button onClick={handleStop} disabled={!isRecording}>
//           Stop
//         </button>
//       </div>
//       <div>
//         <p>User Content: {userContent}</p>
//       </div>
//     </div>
//   );
// };

// export default AppTest;

// -------------------------------------------
// V5 - connected to backend and has TTS and STT
// STT - not working, API not giving access
// STT - implemented in frontend

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AppTest = () => {
//   // STT
//   const [recognition, setRecognition] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [startRecording, setStartRecording] = useState(false);
//   const [stopRecording, setStopRecording] = useState(true);
//   const [userContent, setUserContent] = useState("");
//   // TTS
//   const [audioUrl, setAudioUrl] = useState("");

//   useEffect(() => {
//     const initSpeechRecognition = () => {
//       const recognition = new window.webkitSpeechRecognition();

//       recognition.continuous = true;
//       recognition.onresult = (event) => {
//         const transcript =
//           event.results[event.results.length - 1][0].transcript;
//         setUserContent((prevContent) => prevContent + transcript);
//       };

//       setRecognition(recognition);
//     };

//     initSpeechRecognition();
//   }, []);

//   const handleTextToSpeech = async (text) => {
//     try {
//       const apiKey = process.env.REACT_APP_GOOGLE_TTS_API_KEY;
//       // const apiUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
//       const apiUrl = `https://texttospeech.googleapis.com/v1/text:synthesize`;
//       // const apiUrl = `https://console.cloud.google.com/apis/credentials?project=complete-trees-404810?key=${apiKey}`;
//       // const apiUrl = `https://us-central1-texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`;

//       const response = await axios.post(
//         apiUrl,
//         {
//           input: { text },
//           voice: { languageCode: "en-GB", name: "en-GB-Neural2-B" },
//           audioConfig: { audioEncoding: "LINEAR16" },
//         },
//         {
//           headers: {
//             "X-Goog-Api-Key": `${apiKey}`,
//           },
//         }
//       );

//       // Assuming the audio content is returned in base64 format
//       const audioData = response.data.audioContent;
//       const audioBlob = new Blob([audioData], { type: "audio/wav" });
//       const audioUrl = URL.createObjectURL(audioBlob);

//       setAudioUrl(audioUrl);

//       // Play audio
//       const audio = new Audio(audioUrl);
//       audio.play();
//       setStartRecording(false);
//       setStopRecording(true);
//     } catch (error) {
//       console.error("Error converting text to speech:", error);
//     }
//   };

//   const handleStart = () => {
//     if (recognition) {
//       recognition.start();
//       // setIsRecording(true);
//       setStartRecording(true);
//       setStopRecording(false);
//     }
//   };

//   const handleStop = async () => {
//     if (recognition) {
//       recognition.stop();
//       // setIsRecording(false);
//       setStopRecording(true);
//       console.log("Recording stopped. Content:", userContent);
//     }

//     // Send a POST request using Axios
//     try {
//       const response = await axios.post("http://localhost:5000/api/chat", {
//         messages: [
//           {
//             content: userContent,
//           },
//         ],
//       });

//       console.log("POST request successful!", response.data);

//       // Clear user content after successful POST
//       setUserContent("");

//       // Send latest message to TTS function
//       let latestMessage =
//         response.data.chatMessages[response.data.chatMessages.length - 1];
//       if (latestMessage.role === "assistant") {
//         handleTextToSpeech(latestMessage.content);
//       }
//     } catch (error) {
//       console.error("Error in Axios POST request:", error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>AI interviewer</h1>
//       <div>
//         <button onClick={handleStart} disabled={startRecording}>
//           Start
//         </button>
//         <button onClick={handleStop} disabled={stopRecording}>
//           Stop
//         </button>
//       </div>
//       <div>
//         <p>User Content: {userContent}</p>
//       </div>
//     </div>
//   );
// };

// export default AppTest;

// ----------------------------------------
// V6 - connected to backend and has TTS and STT
// V6 = V5 with minor variations

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AppTest = () => {
//   // STT
//   const [recognition, setRecognition] = useState(null);
//   const [startRecording, setStartRecording] = useState(false);
//   const [stopRecording, setStopRecording] = useState(true);
//   const [userContent, setUserContent] = useState("");
//   // TTS
//   const [audioUrl, setAudioUrl] = useState("");

//   useEffect(() => {
//     const initSpeechRecognition = () => {
//       const recognition = new window.webkitSpeechRecognition();

//       recognition.continuous = true;
//       recognition.onresult = (event) => {
//         const transcript =
//           event.results[event.results.length - 1][0].transcript;
//         setUserContent((prevContent) => prevContent + transcript);
//       };

//       setRecognition(recognition);
//     };

//     initSpeechRecognition();
//   }, []);

//   const handleTextToSpeech = async (text) => {
//     try {
//       const apiKey = process.env.REACT_APP_GOOGLE_TTS_API_KEY;
//       const apiUrl = `https://texttospeech.googleapis.com/v1/text:synthesize`;

//       const response = await axios.post(
//         apiUrl,
//         {
//           input: { text },
//           voice: { languageCode: "en-GB", name: "en-GB-Neural2-B" },
//           audioConfig: { audioEncoding: "LINEAR16" },
//         },
//         {
//           headers: {
//             "X-Goog-Api-Key": `${apiKey}`,
//           },
//         }
//       );

//       const audioData = response.data.audioContent;
//       const audioArrayBuffer = Uint8Array.from(atob(audioData), (c) =>
//         c.charCodeAt(0)
//       ).buffer;

//       const audioBlob = new Blob([audioArrayBuffer], { type: "audio/wav" });
//       const audioUrl = URL.createObjectURL(audioBlob);

//       const audio = new Audio();
//       audio.src = audioUrl;
//       audio.play();

//       setStartRecording(false);
//       setStopRecording(true);
//     } catch (error) {
//       console.error("Error converting text to speech:", error);
//     }
//   };

//   const handleStart = () => {
//     if (recognition) {
//       recognition.start();
//       // setIsRecording(true);
//       setStartRecording(true);
//       setStopRecording(false);
//     }
//   };

//   const handleStop = async () => {
//     if (recognition) {
//       recognition.stop();
//       // setIsRecording(false);
//       setStopRecording(true);
//       console.log("Recording stopped. Content:", userContent);
//     }

//     // Send a POST request using Axios
//     try {
//       const response = await axios.post("http://localhost:5000/api/chat", {
//         messages: [
//           {
//             content: userContent,
//           },
//         ],
//       });

//       console.log("POST request successful!", response.data);

//       // Clear user content after successful POST
//       setUserContent("");

//       // Send latest message to TTS function
//       let latestMessage =
//         response.data.chatMessages[response.data.chatMessages.length - 1];
//       if (latestMessage.role === "assistant") {
//         handleTextToSpeech(latestMessage.content);
//       }
//     } catch (error) {
//       console.error("Error in Axios POST request:", error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>AI interviewer</h1>
//       <div>
//         <button onClick={handleStart} disabled={startRecording}>
//           Start
//         </button>
//         <button onClick={handleStop} disabled={stopRecording}>
//           Stop
//         </button>
//       </div>
//       <div>
//         <p>User Content: {userContent}</p>
//       </div>
//     </div>
//   );
// };

// export default AppTest;

// -------------------------------------------
// V7 - connected to backend and has TTS and STT
// STT - implemented in backend

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AppTest = () => {
//   const [recognition, setRecognition] = useState(null);
//   const [startRecording, setStartRecording] = useState(true);
//   const [stopRecording, setStopRecording] = useState(false);
//   const [userContent, setUserContent] = useState("");
//   const [receivedAudio, setReceivedAudio] = useState("");

//   useEffect(() => {
//     const initSpeechRecognition = () => {
//       const recognition = new window.webkitSpeechRecognition();

//       recognition.continuous = true;
//       recognition.onresult = (event) => {
//         const transcript =
//           event.results[event.results.length - 1][0].transcript;
//         setUserContent((prevContent) => prevContent + transcript);
//       };

//       setRecognition(recognition);
//     };

//     initSpeechRecognition();
//   }, []);

//   const handleStart = () => {
//     if (recognition) {
//       recognition.start();
//       setStartRecording(false);
//       setStopRecording(true);
//     }
//   };

//   const handleStop = async () => {
//     if (recognition) {
//       recognition.stop();
//       setStartRecording(false);
//       setStopRecording(false);
//       console.log("Recording stopped. Content:", userContent);

//       // Send a POST request using Axios
//       try {
//         const response = await axios.post("http://localhost:5000/api/chat", {
//           messages: [
//             {
//               content: userContent,
//             },
//           ],
//         });

//         console.log("POST request successful!", response.data);

//         // Update state with received audio
//         setReceivedAudio(response.data.audio);

//         // Clear user content after successful POST
//         setUserContent("");
//       } catch (error) {
//         console.error("Error in Axios POST request:", error.message);
//       }
//     }
//   };

//   const handleAudioEnded = () => {
//     // Set state to enable startRecording and disable stopRecording
//     setStartRecording(true);
//     setStopRecording(false);
//   };

//   return (
//     <div>
//       <h1>AI interviewer</h1>
//       <div>
//         <button onClick={handleStart} disabled={!startRecording}>
//           Start
//         </button>
//         <button onClick={handleStop} disabled={!stopRecording}>
//           Stop
//         </button>
//       </div>
//       <div>
//         <p>User Content: {userContent}</p>
//       </div>
//       {receivedAudio && (
//         <audio
//           controls
//           src={`data:audio/wav;base64,${receivedAudio}`}
//           onEnded={handleAudioEnded}
//         />
//       )}
//     </div>
//   );
// };

// export default AppTest;
