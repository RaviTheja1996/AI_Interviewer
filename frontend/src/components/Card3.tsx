import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BsLaptop } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";

interface Course {
  id: number;
  title: string;
  description: string;
}

interface interviewObj {
  avgCommunication: number;
  avgProblemSolving: number;
  avgSubjectExpertise: number;
  communicationScores: number[];
  count: number;
  problemSolvingScores: number[];
  subjectExpertiseScores: number[];
}

interface userData {
  fullStackData: interviewObj;
  javascriptData: interviewObj;
  nodeData: interviewObj;
  reactData: interviewObj;
}

const Card3 = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState<userData | undefined>(undefined);

  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4500/interview/", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        console.log(response.data)
        setData(response.data.allInterviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const reactInterviews: interviewObj | undefined = data?.reactData;
  const javascriptInterviews: interviewObj | undefined = data?.javascriptData;
  const fullstackInterviews: interviewObj | undefined = data?.fullStackData;

   console.log(javascriptInterviews);
   
   const renderCourseCards = (courses: interviewObj | undefined) => {
    if (!courses || courses.communicationScores.length === 0) {
        return (
          <div className="flex align-center justify-center ml-10 h-60 border p-4 rounded-md " style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
            <div className="text-center ">
              <img
                className="w-6/12 mb-4 ml-14 "
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NnB4IiBoZWlnaHQ9Ijk2cHgiIGZpbGw9IiM2QjY4NzIiIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cGF0aCBkPSJNMjMyLDE2OGgtOFY3MmEyNCwyNCwwLDAsMC0yNC0yNEg1NkEyNCwyNCwwLDAsMCwzMiw3MnY5NkgyNGE4LDgsMCwwLDAtOCw4djE2YTI0LDI0LDAsMCwwLDI0LDI0SDIxNmEyNCwyNCwwLDAsMCwyNC0yNFYxNzZBOCw4LDAsMCwwLDIzMiwxNjhaTTQ4LDcyYTgsOCwwLDAsMSw4LThIMjAwYTgsOCwwLDAsMSw4LDh2OTZINDhaTTIyNCwxOTJhOCw4LDAsMCwxLTgsOEg0MGE4LDgsMCwwLDEtOC04di04SDIyNFpNMTUyLDg4YTgsOCwwLDAsMS04LDhIMTEyYTgsOCwwLDAsMSwwLTE2aDMyQTgsOCwwLDAsMSwxNTIsODhaIi8+PC9zdmc+"
                alt="course"
              />
              <h3 className="text-xl font-semibold">Nothing here yet</h3>
              <p>Looks like there are no interviews in this block.</p>
            </div>
          </div>
        );
      }
  
    return courses.communicationScores.map((score, index) => (
      <div key={index} className="border p-4 rounded-md " style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
        <div className='flex items-center p-2 pl-0'>
          {/* <BsLaptop size={'30px'} /> */}
          <img className="w-12" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiIGZpbGw9IiM2RTU1QjciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cGF0aCBkPSJNMjE2LDcyVjE3Nkg0MFY3MkExNiwxNiwwLDAsMSw1Niw1NkgyMDBBMTYsMTYsMCwwLDEsMjE2LDcyWiIgb3BhY2l0eT0iMC4yIi8+PHBhdGggZD0iTTIzMiwxNjhoLThWNzJhMjQsMjQsMCwwLDAtMjQtMjRINTZBMjQsMjQsMCwwLDAsMzIsNzJ2OTZIMjRhOCw4LDAsMCwwLTgsOHYxNmEyNCwyNCwwLDAsMCwyNCwyNEgyMTZhMjQsMjQsMCwwLDAsMjQtMjRWMTc2QTgsOCwwLDAsMCwyMzIsMTY4Wk00OCw3MmE4LDgsMCwwLDEsOC04SDIwMGE4LDgsMCwwLDEsOCw4djk2SDQ4Wk0yMjQsMTkyYTgsOCwwLDAsMS04LDhINDBhOCw4LDAsMCwxLTgtOHYtOEgyMjRaTTE1Miw4OGE4LDgsMCwwLDEtOCw4SDExMmE4LDgsMCwwLDEsMC0xNmgzMkE4LDgsMCwwLDEsMTUyLDg4WiIvPjwvc3ZnPg=="
          />
          <h3 className="text-xl font-semibold ml-3">Interviewer: {index + 1}</h3>
        </div>
        <p>General</p>
        <div className=' w-44 flex items-center justify-between p-2 pl-0'>
          {/* <div>Status:</div> */}
          <div>Score: {score}</div>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2 focus:outline-none" onClick={openModal}>View Report</button>
      </div>
    ));
  };
  
  return (
    <div>
      <div className="mx-auto p-4 bg-gray-800 rounded-lg shadow-lg"  >
        <div className="mb-4">
          <ul className="flex gap-5">
            <li className={`mr-4 cursor-pointer ${selectedTab === 0 && 'border-b-2 border-purple-600'}`}>
              <div onClick={() => handleTabChange(0)}>React</div>
            </li>
            <li className={`mr-4 cursor-pointer ${selectedTab === 1 && 'border-b-2 border- border-purple-600'}`}>
              <div onClick={() => handleTabChange(1)}>Javascript</div>
            </li>
            <li className={`cursor-pointer ${selectedTab === 2 && 'border-b-2 border- border-purple-600'}`}>
              <div onClick={() => handleTabChange(2)}>Fullstack</div>
            </li>
          </ul>
        </div>
        <hr className="p-4" />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3.5'>
          {selectedTab === 0 && renderCourseCards(reactInterviews)}
          {selectedTab === 1 && renderCourseCards(javascriptInterviews)}
          {selectedTab === 2 && renderCourseCards(fullstackInterviews)}
        </div>
      </div>
    </div>
  );
};

export default Card3;
