import React from 'react'

interface Prop {
    role: boolean,
    text: string,
    avatar:  string,
    key: number
}

const Chat = ({role, text,key, avatar}:Prop) => {
  return (
    <div className='w-full'>
        <div className={`w-[80%]  p-2 flex justify-between ${role&&"flex-row-reverse"} ${role? "ml-auto": "mr-auto"}`} >
            <div className='w-[3rem] shadow-lg h-[3rem] flex items-center justify-center rounded-full overflow-hidden'><img className='h-full' src={avatar} alt="" /></div>
            <div className='w-[82%] shadow-lg p-4 bg-gray-200 text-black rounded-xl'>{text}</div>
        </div>
    </div>
  )
}

export default Chat