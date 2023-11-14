import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";


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

const Status = () => {
  const [data, setData] = useState<userData | undefined>(undefined);

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

  return (
    <div className="container mx-auto">
      <div className="">
        <p>Hello,</p>
        <p>Here is an Overview of your preparation,</p>
      </div>
      <div className="lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full mt-5">
        <div className="flex w-full md:w-10/12 lg:w-10/12 border-gray-600 border-2 rounded-lg p-2 mt-2">
          <div>
            <img
              className="w-16"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNGRDhEMTQiIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cGF0aCBkPSJNMjE2LDcyVjE3Nkg0MFY3MkExNiwxNiwwLDAsMSw1Niw1NkgyMDBBMTYsMTYsMCwwLDEsMjE2LDcyWiIgb3BhY2l0eT0iMC4yIi8+PHBhdGggZD0iTTIzMiwxNjhoLThWNzJhMjQsMjQsMCwwLDAtMjQtMjRINTZBMjQsMjQsMCwwLDAsMzIsNzJ2OTZIMjRhOCw4LDAsMCwwLTgsOHYxNmEyNCwyNCwwLDAsMCwyNCwyNEgyMTZhMjQsMjQsMCwwLDAsMjQtMjRWMTc2QTgsOCwwLDAsMCwyMzIsMTY4Wk00OCw3MmE4LDgsMCwwLDEsOC04SDIwMGE4LDgsMCwwLDEsOCw4djk2SDQ4Wk0yMjQsMTkyYTgsOCwwLDAsMS04LDhINDBhOCw4LDAsMCwxLTgtOHYtOEgyMjRaTTE1Miw4OGE4LDgsMCwwLDEtOCw4SDExMmE4LDgsMCwwLDEsMC0xNmgzMkE4LDgsMCwwLDEsMTUyLDg4WiIvPjwvc3ZnPg=="
              alt="pending"
            />
          </div>
          <div className="p-2">
            <p>Javascript</p>
            <p className="text-sm"> Interviews : {data?.javascriptData.count}</p>
          </div>
        </div>
        <div className="flex w-full md:w-10/12 lg:w-10/12 border-gray-600 border-2 rounded-lg p-2 mt-2">
          <div>
            <img
              className="w-16"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM1Nzg5RkYiIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cGF0aCBkPSJNMjE2LDcyVjE3Nkg0MFY3MkExNiwxNiwwLDAsMSw1Niw1NkgyMDBBMTYsMTYsMCwwLDEsMjE2LDcyWiIgb3BhY2l0eT0iMC4yIi8+PHBhdGggZD0iTTIzMiwxNjhoLThWNzJhMjQsMjQsMCwwLDAtMjQtMjRINTZBMjQsMjQsMCwwLDAsMzIsNzJ2OTZIMjRhOCw4LDAsMCwwLTgsOHYxNmEyNCwyNCwwLDAsMCwyNCwyNEgyMTZhMjQsMjQsMCwwLDAsMjQtMjRWMTc2QTgsOCwwLDAsMCwyMzIsMTY4Wk00OCw3MmE4LDgsMCwwLDEsOC04SDIwMGE4LDgsMCwwLDEsOCw4djk2SDQ4Wk0yMjQsMTkyYTgsOCwwLDAsMS04LDhINDBhOCw4LDAsMCwxLTgtOHYtOEgyMjRaTTE1Miw4OGE4LDgsMCwwLDEtOCw4SDExMmE4LDgsMCwwLDEsMC0xNmgzMkE4LDgsMCwwLDEsMTUyLDg4WiIvPjwvc3ZnPg=="
              alt="progress"
            />
          </div>
          <div className="p-2">
            <p>React</p>
            <p className="text-sm"> Interviews : {data?.reactData.count}</p>
          </div>
        </div>
        <div className="flex w-full md:w-10/12 lg:w-10/12 border-gray-600 border-2 rounded-lg p-2 mt-2">
          <div>
            <img
              className="w-16"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM0Q0RDNjkiIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cGF0aCBkPSJNMjE2LDcyVjE3Nkg0MFY3MkExNiwxNiwwLDAsMSw1Niw1NkgyMDBBMTYsMTYsMCwwLDEsMjE2LDcyWiIgb3BhY2l0eT0iMC4yIi8+PHBhdGggZD0iTTIzMiwxNjhoLThWNzJhMjQsMjQsMCwwLDAtMjQtMjRINTZBMjQsMjQsMCwwLDAsMzIsNzJ2OTZIMjRhOCw4LDAsMCwwLTgsOHYxNmEyNCwyNCwwLDAsMCwyNCwyNEgyMTZhMjQsMjQsMCwwLDAsMjQtMjRWMTc2QTgsOCwwLDAsMCwyMzIsMTY4Wk00OCw3MmE4LDgsMCwwLDEsOC04SDIwMGE4LDgsMCwwLDEsOCw4djk2SDQ4Wk0yMjQsMTkyYTgsOCwwLDAsMS04LDhINDBhOCw4LDAsMCwxLTgtOHYtOEgyMjRaTTE1Miw4OGE4LDgsMCwwLDEtOCw4SDExMmE4LDgsMCwwLDEsMC0xNmgzMkE4LDgsMCwwLDEsMTUyLDg4WiIvPjwvc3ZnPg=="
              alt="completed"
            />
          </div>
          <div className="p-2">
            <p>Node</p>
            <p className="text-sm"> Interviews : {data?.nodeData.count}</p>
          </div>
        </div>
        <div className="flex w-full md:w-10/12 lg:w-10/12 border-gray-600 border-2 rounded-lg p-2 mt-2">
          <div>
            <img
              className="w-16"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNGRDhEMTQiIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cGF0aCBkPSJNMjE2LDcyVjE3Nkg0MFY3MkExNiwxNiwwLDAsMSw1Niw1NkgyMDBBMTYsMTYsMCwwLDEsMjE2LDcyWiIgb3BhY2l0eT0iMC4yIi8+PHBhdGggZD0iTTIzMiwxNjhoLThWNzJhMjQsMjQsMCwwLDAtMjQtMjRINTZBMjQsMjQsMCwwLDAsMzIsNzJ2OTZIMjRhOCw4LDAsMCwwLTgsOHYxNmEyNCwyNCwwLDAsMCwyNCwyNEgyMTZhMjQsMjQsMCwwLDAsMjQtMjRWMTc2QTgsOCwwLDAsMCwyMzIsMTY4Wk00OCw3MmE4LDgsMCwwLDEsOC04SDIwMGE4LDgsMCwwLDEsOCw4djk2SDQ4Wk0yMjQsMTkyYTgsOCwwLDAsMS04LDhINDBhOCw4LDAsMCwxLTgtOHYtOEgyMjRaTTE1Miw4OGE4LDgsMCwwLDEtOCw4SDExMmE4LDgsMCwwLDEsMC0xNmgzMkE4LDgsMCwwLDEsMTUyLDg4WiIvPjwvc3ZnPg=="
              alt="pending"
            />
          </div>
          <div className="p-2">
            <p>Fullstack</p>
            <p className="text-sm"> Interviews : {data?.fullStackData.count}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
