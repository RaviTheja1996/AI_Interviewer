import React, { useState } from "react";
// import { useToast } from "./custom/ToastProvider";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import { Modal } from "./Modal";
import {BsLaptop} from "react-icons/bs"
import { Link } from 'react-router-dom';
import Cookies from "js-cookie"

interface Course {
  id: number;
  title: string;
  description: string;
}

const Card2 = () => {
//   const toast = useToast();
  const dispatch = useDispatch();

  const [data,setData] = useState([])


//   const isAuth: boolean = useSelector(
//     (store: RootState) => store.authReducer.isAuth
//   );
//   const token: String | null = useSelector(
//     (store: RootState) => store.authReducer.token
//   );
//   const loggedInUser = useSelector(
//     (store: RootState) => store.authReducer.loggedInUser
//   );
//   console.log(isAuth, token, loggedInUser, "Dashboard");
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

 
  

  try {
    axios.get("http://localhost:4500/interview/",{
      headers:{
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    }).then((res) => { // i have to send user.data
     setData(res.data.allInterviews)
    }); // i have to change the link aswell
  } catch (error) {
    console.log(error)
  }

//   const startInterview = async (type: any, toast: any, navigate: any) => {
//     dispatch({ type: POST_STARTINTERVIEW_LOADING });
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/interview/start`,
//         type,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       // console.log(response, "LOGIN");
//       if (response.data) {
//         dispatch({ type: POST_STARTINTERVIEW_SUCCESS, payload: response.data });
//         toast("success", "Interview started successfully");
//       }
//     } catch (error) {
//       console.log(error);
//       dispatch({ type: POST_STARTINTERVIEW_ERROR });
//       toast("error", "Oops! Login failed!");
//     }
//   };

  const allCourses: Course[] = [
    { id: 1, title: 'NEM111', description: 'General1' },
    { id: 2, title: 'NEM 111', description: 'General' },
    { id: 3, title: 'NEM 111', description: 'General' },
    { id: 4, title: 'NEM 111', description: 'General' },
    { id: 5, title: 'NEM 111', description: 'General' },
    { id: 6, title: 'NEM 111', description: 'General' },
    { id: 7, title: 'NEM 111', description: 'General' },
    { id: 8, title: 'NEM 111', description: 'General' },
    // Add more courses as needed
  ];

  const inProgressCourses: Course[] = [
    { id: 3, title: "111", description: "Description for Course 3" },
    { id: 4, title: " 111", description: "Description for Course 4" },
  ];

  const completedCourses: Course[] = [
    { id: 5, title: "ggg 111", description: "Description for Course 5" },
    { id: 6, title: "NEM 111", description: "Description for Course 6" },
  ];

  const renderCourseCards = (courses: Course[]) => {
    return courses.map((course) => (
      <div key={course.id} className="border p-4 rounded-md " style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }} >
        <div className='flex items-center p-2 pl-0'>
        {/* <BsLaptop size={'30px'} /> */}
        <img className="w-12" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiIGZpbGw9IiM2RTU1QjciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cGF0aCBkPSJNMjE2LDcyVjE3Nkg0MFY3MkExNiwxNiwwLDAsMSw1Niw1NkgyMDBBMTYsMTYsMCwwLDEsMjE2LDcyWiIgb3BhY2l0eT0iMC4yIi8+PHBhdGggZD0iTTIzMiwxNjhoLThWNzJhMjQsMjQsMCwwLDAtMjQtMjRINTZBMjQsMjQsMCwwLDAsMzIsNzJ2OTZIMjRhOCw4LDAsMCwwLTgsOHYxNmEyNCwyNCwwLDAsMCwyNCwyNEgyMTZhMjQsMjQsMCwwLDAsMjQtMjRWMTc2QTgsOCwwLDAsMCwyMzIsMTY4Wk00OCw3MmE4LDgsMCwwLDEsOC04SDIwMGE4LDgsMCwwLDEsOCw4djk2SDQ4Wk0yMjQsMTkyYTgsOCwwLDAsMS04LDhINDBhOCw4LDAsMCwxLTgtOHYtOEgyMjRaTTE1Miw4OGE4LDgsMCwwLDEtOCw4SDExMmE4LDgsMCwwLDEsMC0xNmgzMkE4LDgsMCwwLDEsMTUyLDg4WiIvPjwvc3ZnPg==" alt="course" />
        <h3 className="text-xl font-semibold ml-3">{course.title}</h3>
        </div>
        <p>{course.description}</p>

        <div className=' w-44 flex items-center justify-between p-2 pl-0'>
          <div>10 min</div>
          <div >completed</div>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2 focus:outline-none" onClick={openModal}>View Report</button>
      </div>
    ));
  };

  return (
    <div>
      <div className=" mx-auto p-4 bg-gray-800 rounded-lg shadow-lg"  >
        {/* <p className='h2 mb-3'>My Card2</p> */}
        <div className="mb-4">
          <ul className="flex gap-5">
            <li className={`mr-4 cursor-pointer ${selectedTab === 0 && 'border-b-2 border-purple-600'}`}>
              <div onClick={() => handleTabChange(0)}>All Courses</div>
            </li>
            <li className={`mr-4 cursor-pointer ${selectedTab === 1 && 'border-b-2 border- border-purple-600'}`}>
              <div onClick={() => handleTabChange(1)}>In Progress</div>
            </li>
            <li className={`cursor-pointer ${selectedTab === 2 && 'border-b-2 border- border-purple-600'}`}>
              <div onClick={() => handleTabChange(2)}>Completed</div>
            </li>
          </ul>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3.5'>
          {selectedTab === 0 && renderCourseCards(allCourses)}
          {selectedTab === 1 && renderCourseCards(inProgressCourses)}
          {selectedTab === 2 && renderCourseCards(completedCourses)}
        </div>
      </div>
      {/* <div>
          <Modal isOpen={isModalOpen} onClose={closeModal}>

            <div style={{display:'flex', justifyContent:"space-between",padding:"10%",textAlign:"center",gap:"20px"}}>
              <div  className="cursor-pointer hover:bg-blue-300"style={{border:"1px solid black", width:"100px", height:"50px",paddingTop:"10px"}}>
                MERN
              </div>
              <div className="cursor-pointer hover:bg-blue-300" style={{border:"1px solid black", width:"100px", height:"50px",paddingTop:"10px"}}>
                JAVA
              </div>
              <div className="cursor-pointer hover:bg-blue-300" style={{border:"1px solid black", width:"100px", height:"50px",paddingTop:"10px"}}>
                DSA
              </div>
            </div>
          
           <div style={{marginLeft:"25%"}}>
              <Link to="/dashboard/start_interview"><button className="btn">Start the Interview</button></Link>
           </div>
          </Modal>
       </div> */}
    </div>
  );
};

export default Card2;