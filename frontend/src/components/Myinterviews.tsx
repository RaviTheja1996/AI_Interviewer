import React from 'react'
import Card from './Card'
import Card2 from './Card2'
import Card3 from './Card3'

const Myinterviews = () => {
  return (
    <div>
        <div>
            <h1 className='text-3xl'>My Interviews</h1>
             {/* <Card2/> */}
             <Card3/>
        </div>
        {/* <div className='grid grid-cols-3 mt-2 w-5/12'> */}
            {/* <div >
                All
            </div>
            <div>
                In Progress
            </div>
            <div>
                Completed
            </div>
        </div>
        <hr className='border-gray-600 p-2 mt-2' />
        <div className='lg:grid grid-cols-3 justify-center'>
            <Card/>
            <Card/>
            <Card/> */}
            
        {/* </div> */}
    </div>
  )
}

export default Myinterviews