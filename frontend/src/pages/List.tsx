import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const List = () => {
  const navigate = useNavigate();
  return (
    <div className=" dark:bg-gray-900 bg-white py-10">
      <div className="w-[80%] mx-auto flex flex-wrap justify-evenly gap-y-10">
        <div className="w-[20rem] rounded-lg dark:bg-gray-800 bg-white py-4 shadow-3xl">
          <img
            className="w-[90%] rounded-md mx-auto"
            src="https://firebasestorage.googleapis.com/v0/b/harshdeep-gill-portfolio-websi.appspot.com/o/Resources%2F4.png?alt=media&token=39a342e8-fc7b-46a2-98a6-43dc129f79b0"
            alt="React"
          />
          <div className="p-4 flex flex-col items-center gap-4">
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white">
              React
            </h3>
            <ol className="w-[60%]">
              <li className="flex items-center gap-3 text-gray-900 dark:text-white">
                <FaCircleCheck className=" text-green-500" />
                Basics
              </li>
              <li className="flex items-center gap-3 text-gray-900 dark:text-white">
                <FaCircleCheck className=" text-green-500" />
                Hooks
              </li>
              <li className="flex items-center gap-3 text-gray-900 dark:text-white">
                <FaCircleCheck className=" text-green-500" />
                Reducers
              </li>
              <li className="flex items-center gap-3 text-gray-900 dark:text-white">
                <FaCircleCheck className=" text-green-500" />
                Redux
              </li>
            </ol>
            <div className="text-white border-2 rounded-xl p-2">
              <p>
                <strong>Interviewer:</strong>
              </p>
              <p>
                <i>Virat Kholi</i>
              </p>
            </div>
            <button
              onClick={() => {
                navigate("/interview/react");
              }}
              className="text-lg rounded-3xl bg-white w-[70%] p-2 dark:text-gray-900 text-white"
            >
              Start
            </button>
          </div>
        </div>

        <div className="w-[20rem] rounded-lg dark:bg-gray-800 bg-white py-4 shadow-3xl">
          <img
            className="w-[90%] rounded-md mx-auto"
            src="https://firebasestorage.googleapis.com/v0/b/harshdeep-gill-portfolio-websi.appspot.com/o/Resources%2F2.png?alt=media&token=5a156672-ab3f-4d2e-86f6-0231d9e346a3"
            alt="React"
          />
          <div className="p-4 flex flex-col items-center gap-4">
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white">
              Node
            </h3>
            <ol className="w-[60%]">
              <li className="flex items-center gap-3 text-gray-900 dark:text-white">
                <FaCircleCheck className=" text-green-500" />
                Basics
              </li>
              <li className="flex items-center gap-3 text-gray-900 dark:text-white">
                <FaCircleCheck className=" text-green-500" />
                Express
              </li>
              <li className="flex items-center gap-3 text-gray-900 dark:text-white">
                <FaCircleCheck className=" text-green-500" />
                Middlewares
              </li>
              <li className="flex items-center gap-3 text-gray-900 dark:text-white">
                <FaCircleCheck className=" text-green-500" />
                MVC
              </li>
            </ol>
            <div className="text-white border-2 rounded-xl p-2">
              <p>
                <strong>Interviewer:</strong>
              </p>
              <p>
                <i>Christiano Ronaldo</i>
              </p>
            </div>
            <button
              onClick={() => {
                navigate("/interview/node");
              }}
              className="text-lg rounded-3xl bg-white w-[70%] p-2 dark:text-gray-900 text-white"
            >
              Start
            </button>
          </div>
        </div>

        <div className="w-[20rem] rounded-lg dark:bg-gray-800 bg-white py-4 shadow-3xl">
          <img
            className="w-[90%] rounded-md mx-auto"
            src="https://firebasestorage.googleapis.com/v0/b/harshdeep-gill-portfolio-websi.appspot.com/o/Resources%2F8.png?alt=media&token=04254467-278d-4bc1-872d-3b097f4bd1b2"
            alt="React"
          />
          <div className="p-4 flex flex-col items-center gap-4">
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white">
              JavaScript
            </h3>
            <ol className="w-[60%]">
              <li className="flex items-center gap-3 text-gray-900 dark:text-white">
                <FaCircleCheck className=" text-green-500" />
                Basics
              </li>
              <li className="flex items-center gap-3 text-gray-900 dark:text-white">
                <FaCircleCheck className=" text-green-500" />
                ES6
              </li>
              <li className="flex items-center gap-3 text-gray-900 dark:text-white">
                <FaCircleCheck className=" text-green-500" />
                Promise
              </li>
              <li className="flex items-center gap-3 text-gray-900 dark:text-white">
                <FaCircleCheck className=" text-green-500" />
                Asynchronous JS
              </li>
            </ol>
            <div className="text-white border-2 rounded-xl p-2">
              <p>
                <strong>Interviewer:</strong>
              </p>
              <p>
                <i>Amitabh Bachchan</i>
              </p>
            </div>
            <button
              onClick={() => {
                navigate("/interview/javascript");
              }}
              className="text-lg rounded-3xl bg-white w-[70%] p-2 dark:text-gray-900 text-white"
            >
              Start
            </button>
          </div>
        </div>

        <div className="w-[20rem] rounded-lg dark:bg-gray-800 bg-white py-4 shadow-3xl">
          <img
            className="w-[90%] rounded-md mx-auto"
            src="https://firebasestorage.googleapis.com/v0/b/harshdeep-gill-portfolio-websi.appspot.com/o/Resources%2F4.png?alt=media&token=39a342e8-fc7b-46a2-98a6-43dc129f79b0"
            alt="React"
          />
          <div className="p-4 flex flex-col items-center gap-4">
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white">
              Full-Stack
            </h3>
            <ol className="w-[60%]">
              <li className="flex items-center gap-3 text-gray-900 dark:text-white">
                <FaCircleCheck className=" text-green-500" />
                React
              </li>
              <li className="flex items-center gap-3 text-gray-900 dark:text-white">
                <FaCircleCheck className=" text-green-500" />
                Node
              </li>
              <li className="flex items-center gap-3 text-gray-900 dark:text-white">
                <FaCircleCheck className=" text-green-500" />
                Express
              </li>
              <li className="flex items-center gap-3 text-gray-900 dark:text-white">
                <FaCircleCheck className=" text-green-500" />
                MongoDB
              </li>
            </ol>
            <div className="text-white border-2 rounded-xl p-2">
              <p>
                <strong>Interviewer:</strong>
              </p>
              <p>
                <i>Rahul Gandhi</i>
              </p>
            </div>
            <button
              onClick={() => {
                navigate("/interview/fullstack");
              }}
              className="text-lg rounded-3xl bg-white w-[70%] p-2 dark:text-gray-900 text-white hover:shadow-2xl"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
