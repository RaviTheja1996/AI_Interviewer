import React from 'react'

interface Prop {
    role: boolean,
    text: string,
    avatar:  string,
    key: number
}

const Chat = ({role, text,key, avatar= ""}:Prop) => {
  return (
    <div>
        <div className={`w-[97%] flex items-center ${role&&"flex-row-reverse"}`} >
            <div className='w-[20%] flex items-center justify-center rounded-full'><img className='h-full' src={role? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Frobot_1068549&psig=AOvVaw2vNDWBy2FJq6U_pamrEvgc&ust=1700068360967000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIi6_qf-w4IDFQAAAAAdAAAAABAF": avatar} alt="" /></div>
            <div className='w-[75%] p-4 bg-indigo-950 text-white'>{text}</div>
        </div>
    </div>
  )
}

export default Chat