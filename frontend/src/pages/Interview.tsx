import axios from 'axios';
import React, {useRef, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Chat from '../components/Chat';
// import {FaUser, FaRobot} from "react-icons/fa";
import {IoMdMicrophone} from "react-icons/io";

const burl = process.env.REACT_APP_BACKEND_URL;
// interface FunctionInterface {
//   (arg1: chatObj, arg2: number): any;
// }
interface chatObj {
  role: string,
  content: string
}

interface Reducer {
  isLoadingNextQuestion: boolean,
  isLoadingInitial: boolean,
  isErrorInitial: boolean,
  interviewId: string,
  chatHistory: chatObj[]
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
    // const [audioUrl, setAudioUrl] = useState<string>("");
  //Speech functionalities
  const {module} = useParams();

  const {isLoadingNextQuestion, isLoadingInitial, isErrorInitial, interviewId, chatHistory} = useSelector((store:Store ) => {
    return {
      isLoadingNextQuestion: store.aiReducer.isLoadingNextQuestion,
      isLoadingInitial: store.aiReducer.isLoadingInitial,
      isErrorInitial: store.aiReducer.isErrorInitial,
      interviewId: store.aiReducer.interviewId,
      chatHistory: store.aiReducer.chatHistory
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
          "Authorization": `Bearer ${Cookies.get("token")}`
        }
      })
      .then((res)=>{
        dispatch({type: "INITIAL_LOAD_SUCC"});
        let latestMessage = res.data.data.interviewDetails.chatHistory[res.data.data.interviewDetails.chatHistory.length - 1];
        if (latestMessage.role === "assistant") {
          handleTextToSpeech(latestMessage.content);
        }
        let iid = res.data.data.interviewDetails._id;
        let ch = res.data.data.interviewDetails.chatHistory;
        console.log(iid);
        dispatch({type: "INTERVIEW_ID", payload: iid});
        dispatch({type: "CHAT_ARRAY", payload: ch});
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleStart = () => {
    console.log(interviewId)
    if (recognition) {
      recognition.start();
      setStartRecording(true);
      setStopRecording(false);
    }
  };

  const endInterview = async () => {
    

    // Send a PATCH request using Axios
    try {
      const response = await axios.patch(`https://odd-cyan-basket-clam-hem.cyclic.app/interview/${module}`,
      {
        interviewId: interviewId,
        userReply: "End the interview And share the feedback.",
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
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
      let ch = response.data.data.chatHistory;
      // console.log(ch)
      dispatch({type: "CHAT_ARRAY", payload: ch});
    } catch (error) {
      console.error("Error in Axios PATCH request:", error);
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
      const response = await axios.patch(`https://odd-cyan-basket-clam-hem.cyclic.app/interview/${module}`,
      {
        interviewId: interviewId,
        userReply: userContent,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
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
      let ch = response.data.data.chatHistory;
      // console.log(ch)
      dispatch({type: "CHAT_ARRAY", payload: ch});
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
    <div className='bg-gray-900 relative'>
      {isLoadingInitial && <div className='w-full h-full bg-white bg-opacity-30 absolute flex justify-center items-center'><h1 className='text-3xl '>Loading...</h1></div>}

      <div className='text-center'><h1 className='text-white text-3xl py-5'>Welcome to {module} interview</h1></div>

      <div className='flex w-[90%] mx-auto justify-between '>
        <div className='w-[57%] rounded-lg h-[30rem] bg-gray-800 overflow-hidden'>
          <video className='w-full' ref={videoEl} id='videoElement' autoPlay={true} ></video>
        </div>
        <div className='w-[40%] rounded-lg overflow-hidden h-[30rem] bg-gray-800'>
          <div className='text-center bg-gray-400'><h2 className='text-lg p-2'>Conversation</h2></div>
          <div className='h-[90%] overflow-y-auto'>
<div className='flex flex-col gap-4'>
  {
    chatHistory?.map((el, index) => index!==0&&
      (<Chat
          key={index}
          role={el.role === 'assistant' ? true : false}
          text={el.content}
          avatar={el.role != 'assistant' ? "https://upload.wikimedia.org/wikipedia/commons/9/9e/Male_Avatar.jpg": "https://img6.arthub.ai/64eca2b6-b8a0.webp"}
        />)
      )
  }
</div>
          </div>
        </div>
      </div>

      <div className='mt-10 flex justify-center gap-8'>
        {isLoadingNextQuestion?<div className='h-14 '><img className='h-full' src="https://media.giphy.com/media/oOylMv2oLDxcxGzYn6/giphy.gif" alt="ai gif" /></div> : <button onClick={handleStart} className='w-[10rem] rounded-lg p-3 bg-white flex items-center justify-center gap-3'><p>Start</p><IoMdMicrophone size={30} /></button> }
        <button className='w-[10rem] rounded-lg p-3 bg-white flex items-center justify-center gap-3' onClick={handleStop}><p>Stop</p> <IoMdMicrophone size={30} /></button>
      </div>
      <div className='py-10 flex justify-center'>
        <button className='w-[10rem] rounded-lg p-3 bg-orange-700' onClick={endInterview}>End Interview</button>
      </div>
    </div>
  )
}

export default Interview