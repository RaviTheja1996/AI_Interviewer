import axios from 'axios';
import React, {useRef, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import dotenv from 'dotenv';
// dotenv.config();
const burl = process.env.REACT_APP_BACKEND_URL;

interface Reducer {
  isLoadingNextQuestion: boolean,
  isLoadingInitial: boolean,
  isErrorInitial: boolean
}

interface Store {
  aiReducer: Reducer
}
declare global {
  interface Window {
    webkitSpeechRecognition:any;
  }
}

const Interview = () => {
  const videoEl = useRef<HTMLVideoElement>(null);

  //Speech functionalities
  const [recognition, setRecognition] = useState<any>(null);
  const [startRecording, setStartRecording] = useState<boolean>(false);
  const [stopRecording, setStopRecording] = useState<boolean>(true);
  const [userContent, setUserContent] = useState<string>("");
    const [audioUrl, setAudioUrl] = useState<string>("");
  //Speech functionalities
  const {module} = useParams();

  const {isLoadingNextQuestion, isLoadingInitial, isErrorInitial} = useSelector((store:Store ) => {
    return {
      isLoadingNextQuestion: store.aiReducer.isLoadingNextQuestion,
      isLoadingInitial: store.aiReducer.isLoadingInitial,
      isErrorInitial: store.aiReducer.isErrorInitial
    }
  });
  const dispatch = useDispatch();

  useEffect(()=> {
    navigator.mediaDevices.getUserMedia({video: true})
    .then((stream)=> {
      if(videoEl.current){
        videoEl.current.srcObject = stream;
      }
      // sending the first response
      dispatch({type: "INITIAL_LOAD_REQ"})
      axios.post(`${burl}/interview/${module}`, {}, {
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcnNoIiwidXNlcklEIjoiNjU1MmRkMzQxYTNjYWNkMzA2MmNjZmZmIiwiaWF0IjoxNjk5OTI5NDc3LCJleHAiOjE3MDA1MzQyNzd9.gGYk80pJfk-bAPwgmFKrFsZrHG-YqxUlGOUYMk1RWJw"
        }
      })
      .then((res)=>{
        dispatch({type: "INITIAL_LOAD_SUCC"});
        let latestMessage = res.data.data.interviewDetails.chatHistory[res.data.data.interviewDetails.chatHistory.length - 1];
        if (latestMessage.role === "assistant") {
          handleTextToSpeech(latestMessage.content);
        }
        console.log(res);
      })
      .catch((err)=>{
        dispatch({type: "INITIAL_LOAD_FAIL"});
        console.log(err);
      })
    })
    .catch((err)=> {
      console.log(err);
    });

    
    const initSpeechRecognition = () => {
      const recognition = new window.webkitSpeechRecognition();

      recognition.continuous = true;
      recognition.onresult = (event: any) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript;
        setUserContent((prevContent) => prevContent + transcript);
      };

      setRecognition(recognition);
    };

    initSpeechRecognition();  

  }, [])

  const handleStart = () => {
    if (recognition) {
      recognition.start();
      setStartRecording(true);
      setStopRecording(false);
    }
  };

  const handleStop = async () => {
    if (recognition) {
      recognition.stop();
      setStopRecording(true);
      console.log("Recording stopped. Content:", userContent);
    }

    // Send a PATCH request using Axios
    try {
      const response = await axios.patch(`http://localhost:4500/interview/${module}`,
      {
        interviewId: "65531dad1a3cacd3062cd0d3",
        userReply: userContent,
      },
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcnNoIiwidXNlcklEIjoiNjU1MmRkMzQxYTNjYWNkMzA2MmNjZmZmIiwiaWF0IjoxNjk5OTI5NDc3LCJleHAiOjE3MDA1MzQyNzd9.gGYk80pJfk-bAPwgmFKrFsZrHG-YqxUlGOUYMk1RWJw",
        },
      }
      );

      

      console.log("PATCH request successful!", response.data);

      // Clear user content after successful POST
      setUserContent("");

      // Send latest message to TTS function
      let latestMessage =
        response.data.data.chatHistory[response.data.data.chatHistory.length - 1];
      if (latestMessage.role === "assistant") {
        handleTextToSpeech(latestMessage.content);
      }
    } catch (error) {
      console.error("Error in Axios PATCH request:", error);
    }
  };

    const handleTextToSpeech = async (text: string) => {
    try {
      const apiKey = process.env.REACT_APP_GOOGLE_TTS_API_KEY;
      const apiUrl = `https://texttospeech.googleapis.com/v1/text:synthesize`;

      const response = await axios.post(
        apiUrl,
        {
          input: { text },
          voice: { languageCode: "en-GB", name: "en-GB-Neural2-B" },
          audioConfig: { audioEncoding: "LINEAR16" },
        },
        {
          headers: {
            "X-Goog-Api-Key": `${apiKey}`,
          },
        }
      );

      const audioData = response.data.audioContent;
      const audioArrayBuffer = Uint8Array.from(atob(audioData), (c) =>
        c.charCodeAt(0)
      ).buffer;

      const audioBlob = new Blob([audioArrayBuffer], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio();
      audio.src = audioUrl;
      audio.play();
      console.log("played");

      setStartRecording(false);
      setStopRecording(true);
    } catch (error) {
      console.error("Error converting text to speech:", error);
    }
  };

  return (
    <div className='bg-gray-900'>
      <div></div>

      <div className='text-center'><h1 className='text-white text-3xl py-5'>Welcome to {module} interview</h1></div>

      <div className='flex w-[90%] mx-auto justify-between '>
        <div className='w-[65%] h-[30rem] bg-gray-800 overflow-hidden'>
          <video className='w-full' ref={videoEl} id='videoElement' autoPlay={true} ></video>
        </div>
        <div className='w-[32%] h-[30rem] bg-gray-800'>
          <div className='text-center bg-gray-400'><h2 className='text-lg p-2'>Conversation</h2></div>
        </div>
      </div>

      <div className='mt-10 flex justify-center'>
        {isLoadingNextQuestion?<div className='h-14 '><img className='h-full' src="https://media.giphy.com/media/oOylMv2oLDxcxGzYn6/giphy.gif" alt="ai gif" /></div> : <button onClick={handleStart} className='w-[10rem] rounded-lg p-3 bg-white'>Start Interview</button> }
        <button onClick={handleStop}>Stop</button>
      </div>
    </div>
  )
}

export default Interview