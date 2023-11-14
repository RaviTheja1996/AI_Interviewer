import React from 'react'

const Card = () => {
  return (
    <div >
        <div className='w-10/12 border-gray-600 border-2 rounded-lg p-2 sm:gap-2'>
            <div  className='lg:grid grid-cols-3 sm:grid-cols-1'>
              <img className='w-16' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiIGZpbGw9IiM2RTU1QjciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cGF0aCBkPSJNMjE2LDcyVjE3Nkg0MFY3MkExNiwxNiwwLDAsMSw1Niw1NkgyMDBBMTYsMTYsMCwwLDEsMjE2LDcyWiIgb3BhY2l0eT0iMC4yIi8+PHBhdGggZD0iTTIzMiwxNjhoLThWNzJhMjQsMjQsMCwwLDAtMjQtMjRINTZBMjQsMjQsMCwwLDAsMzIsNzJ2OTZIMjRhOCw4LDAsMCwwLTgsOHYxNmEyNCwyNCwwLDAsMCwyNCwyNEgyMTZhMjQsMjQsMCwwLDAsMjQtMjRWMTc2QTgsOCwwLDAsMCwyMzIsMTY4Wk00OCw3MmE4LDgsMCwwLDEsOC04SDIwMGE4LDgsMCwwLDEsOCw4djk2SDQ4Wk0yMjQsMTkyYTgsOCwwLDAsMS04LDhINDBhOCw4LDAsMCwxLTgtOHYtOEgyMjRaTTE1Miw4OGE4LDgsMCwwLDEtOCw4SDExMmE4LDgsMCwwLDEsMC0xNmgzMkE4LDgsMCwwLDEsMTUyLDg4WiIvPjwvc3ZnPg==" alt="progress" />
              <p className='pt-4'>Mern</p>
            </div>
            <div className='p-2'>
            </div >
            <div className='grid grid-cols-2 w-5/12'>
                <p>Status:</p>
                <p >Completed</p>
            </div>
            <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2 focus:outline-none">
            View Report
          </button>
            </div>
       </div>
    </div>
  )
}

export default Card