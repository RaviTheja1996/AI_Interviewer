import React, {useRef, useEffect} from 'react';
import { useSelector } from 'react-redux';
interface Reducer {
  isLoading: boolean
}

interface Store {
  aiReducer: Reducer
}

const Interview = () => {
  const videoEl = useRef<HTMLVideoElement>(null);

  const isLoading = useSelector((store:Store ) => store.aiReducer.isLoading);

  useEffect(()=> {
    navigator.mediaDevices.getUserMedia({video: true})
    .then((stream)=> {
      if(videoEl.current){
        videoEl.current.srcObject = stream;
      }
    })
    .catch((err)=> {
      console.log(err);
    })
  }, [])

  return (
    <div className='bg-gray-900 py-10'>
      <div className='flex w-[90%] mx-auto justify-between '>
        <div className='w-[65%] h-[30rem] bg-gray-800 overflow-hidden'>
          <video className='w-full' ref={videoEl} id='videoElement' autoPlay={true} ></video>
        </div>
        <div className='w-[32%] h-[30rem] bg-gray-800'></div>
      </div>

      <div className='mt-10 flex justify-center'>
        {isLoading?<div className='h-14 '><img className='h-full' src="https://media.giphy.com/media/oOylMv2oLDxcxGzYn6/giphy.gif" alt="ai gif" /></div> : <button className='w-[10rem] rounded-lg p-3 bg-white'>Start Interview</button> }
      </div>
    </div>
  )
}

export default Interview