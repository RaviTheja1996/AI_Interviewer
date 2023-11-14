import React from 'react';
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const List = () => {
  const navigate = useNavigate();
  return (
    <div className=' dark:bg-gray-900 bg-white pt-10'>
      <div className='w-[80%] mx-auto flex flex-wrap justify-evenly'>
        <div className='w-[20rem] rounded-lg dark:bg-gray-800 bg-white py-4'>
          <img className='w-[90%] rounded-md mx-auto' src="https://firebasestorage.googleapis.com/v0/b/harshdeep-gill-portfolio-websi.appspot.com/o/Resources%2F4.png?alt=media&token=39a342e8-fc7b-46a2-98a6-43dc129f79b0" alt="React" />
          <div className='p-4 flex flex-col items-center gap-4'>
            <h3 className='text-xl font-bold text-center text-gray-900 dark:text-white'>React</h3>
            <ol className='w-[60%]'>
              <li className='flex items-center gap-3 text-gray-900 dark:text-white'><FaCircleCheck className=' text-green-500'/>Basics</li>
              <li className='flex items-center gap-3 text-gray-900 dark:text-white'><FaCircleCheck className=' text-green-500'/>Hooks</li>
              <li className='flex items-center gap-3 text-gray-900 dark:text-white'><FaCircleCheck className=' text-green-500'/>Reducers</li>
              <li className='flex items-center gap-3 text-gray-900 dark:text-white'><FaCircleCheck className=' text-green-500'/>Redux</li>
            </ol>
            <button onClick={()=> {navigate("/interview/react")}} className='text-lg rounded-3xl bg-white w-[70%] p-2 dark:text-gray-900 text-white'>Start</button>
          </div>
        </div>

        <div className='w-[20rem] rounded-lg dark:bg-gray-800 bg-white py-4'>
          <img className='w-[90%] rounded-md mx-auto' src="https://firebasestorage.googleapis.com/v0/b/harshdeep-gill-portfolio-websi.appspot.com/o/Resources%2F4.png?alt=media&token=39a342e8-fc7b-46a2-98a6-43dc129f79b0" alt="React" />
          <div className='p-4 flex flex-col items-center gap-4'>
            <h3 className='text-xl font-bold text-center text-gray-900 dark:text-white'>React</h3>
            <ol className='w-[60%]'>
              <li className='flex items-center gap-3 text-gray-900 dark:text-white'><FaCircleCheck className=' text-green-500'/>Basics</li>
              <li className='flex items-center gap-3 text-gray-900 dark:text-white'><FaCircleCheck className=' text-green-500'/>Hooks</li>
              <li className='flex items-center gap-3 text-gray-900 dark:text-white'><FaCircleCheck className=' text-green-500'/>Reducers</li>
              <li className='flex items-center gap-3 text-gray-900 dark:text-white'><FaCircleCheck className=' text-green-500'/>Redux</li>
            </ol>
            <button onClick={()=> {navigate("/interview/node")}} className='text-lg rounded-3xl bg-white w-[70%] p-2 dark:text-gray-900 text-white'>Start</button>
          </div>
        </div>

        <div className='w-[20rem] rounded-lg dark:bg-gray-800 bg-white py-4'>
          <img className='w-[90%] rounded-md mx-auto' src="https://firebasestorage.googleapis.com/v0/b/harshdeep-gill-portfolio-websi.appspot.com/o/Resources%2F4.png?alt=media&token=39a342e8-fc7b-46a2-98a6-43dc129f79b0" alt="React" />
          <div className='p-4 flex flex-col items-center gap-4'>
            <h3 className='text-xl font-bold text-center text-gray-900 dark:text-white'>React</h3>
            <ol className='w-[60%]'>
              <li className='flex items-center gap-3 text-gray-900 dark:text-white'><FaCircleCheck className=' text-green-500'/>Basics</li>
              <li className='flex items-center gap-3 text-gray-900 dark:text-white'><FaCircleCheck className=' text-green-500'/>Hooks</li>
              <li className='flex items-center gap-3 text-gray-900 dark:text-white'><FaCircleCheck className=' text-green-500'/>Reducers</li>
              <li className='flex items-center gap-3 text-gray-900 dark:text-white'><FaCircleCheck className=' text-green-500'/>Redux</li>
            </ol>
            <button onClick={()=> {navigate("/interview/javascript")}} className='text-lg rounded-3xl bg-white w-[70%] p-2 dark:text-gray-900 text-white'>Start</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List