import React, { useState, useRef, useEffect } from 'react';
import Status from '../components/Status';
import Myinterviews from '../components/Myinterviews';
import Cookies from "js-cookie";
import { FaHome,FaUser,FaBriefcase,FaSignOutAlt } from 'react-icons/fa';
import {BiSolidDashboard,BiLogIn} from "react-icons/bi"

interface Props {}

const Dashboard: React.FC<Props> = () => {
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const token: string | undefined = Cookies.get("token") || undefined;


  const toggleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (userMenuButtonRef.current && !userMenuButtonRef.current.contains(event.target as Node)) {
      closeUserMenu();
    }
  };

  useEffect(() => {
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isUserMenuOpen]);

  return (
    <div className='bg-gray-800 text-white'>
      <nav className="fixed top-0 z-50 w-full bg-gray-800 border-b border-gray-600 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="/" className="flex ms-2 md:me-24">
                <img
                  src="https://huru.ai/wp-content/uploads/2023/05/HURU-LOGO.webp"
                  className="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                  AI Interviewer
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                    aria-expanded="false"
                    onClick={toggleUserMenu}
                  >
                    <span className="sr-only">Open user menu</span>
                 
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://img.freepik.com/premium-photo/memoji-happy-man-white-background-emoji_826801-6840.jpg?size=338&ext=jpg&ga=GA1.1.1826414947.1698883200&semt=ais"
                      alt="img"
                    />
                  </button>
                </div>
                {isUserMenuOpen && (
              <div className="z-50 absolute right-0 mt-2 hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                <div className="px-4 py-3" role="none">
                  <p className="text-sm text-gray-900 dark:text-white" role="none">
                    Suriya Singaravel
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                    suriya@gmail.com
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="/logout"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
               )}
            </div>
          </div>
        </div>
        </div>
      </nav>
  
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full  border-r border-gray-600 sm:translate-x-0 bg-gray-800 text-white"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto  bg-gray-800 text-white">
          <ul className="space-y-2 font-medium">
          <li>
              <a
                href="/"
                className="flex items-center p-2 text-gray-200 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-black"
              >
                  {/* <svg
      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 3v10a3 3 0 003 3h5v5a1 1 0 001.7.7l7-7a1 1 0 000-1.4l-7-7A1 1 0 0011 1H6a3 3 0 00-3 3z"
      ></path>
    </svg> */}
    <FaHome/>
                <span className="ml-2">Home</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard"
                className="flex items-center p-2 text-gray-200 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-black"
              >
                {/* <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.025-.432.025-.708a10 10 0 1 0-20 0c0 .276.012.52.025.708a1 1 0 0 0 1 .935H11V1.02c0-.257.01-.475.036-.648A7.459 7.459 0 0 1 12.5 0Z" />
                </svg> */}
                <BiSolidDashboard/>
                <span className="ml-2">Dashboard</span>
              </a>
            </li>
        
            <li>
              <a
                href="/interviews"
                className="flex items-center p-2 text-gray-200 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-black"              >
               {/* <svg
  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
  fill="currentColor"
  viewBox="0 0 20 20"
>
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M10 0C4.47715 0 0 4.47715 0 10C0 13.3148 1.92579 16.3141 5 18.3V20L7.70292 17.5H12.2971L15 20V18.3C18.0742 16.3141 20 13.3148 20 10C20 4.47715 15.5228 0 10 0ZM8.875 12.5C8.875 13.3284 9.54645 14 10.375 14C11.2036 14 11.875 13.3284 11.875 12.5C11.875 11.6716 11.2036 11 10.375 11C9.54645 11 8.875 11.6716 8.875 12.5ZM14.375 12.5C14.375 11.1766 13.1982 10 11.875 10C10.5518 10 9.375 11.1766 9.375 12.5C9.375 13.8234 10.5518 15 11.875 15C13.1982 15 14.375 13.8234 14.375 12.5Z"
  />
</svg> */}
                <FaBriefcase/>
                <span className="ml-2">Interviews</span>
              </a>
            </li>
            {token ? (
  <li>
    <a
      href="/logout"
      className="flex items-center p-2 text-gray-200 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-black"
      >
      {/* <svg
        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 19l-7-7m0 0l7-7m-7 7h18"
        ></path>
      </svg> */}
      <FaSignOutAlt/>
      <span className="ml-2">Logout</span>
    </a>
  </li>
) : (
  <>
    <li>
      <a
        href="/login"
        className="flex items-center p-2 text-gray-200 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-black"
        >
     {/* <svg
  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M14 19l-7-7m0 0l7-7m-7 7h18"
  ></path>
</svg> */}
      <BiLogIn/>
        <span className="ml-2">Login</span>
      </a>
    </li>
    <li>
      <a
        href="/register"
        className="flex items-center p-2 text-gray-200 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-black"
        >
       {/* <svg
  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M14 19l-7-7m0 0l7-7m-7 7h18"
  ></path>
</svg> */}
        <FaUser/> 
        <span className="ml-2">Sign up</span>
      </a>
    </li>
  </>
)}

          </ul>
        </div>
      </aside>
    {/* //Content */}
      <div className="p-4 sm:ml-64 bg-gray-800 text-white">
        <div className="p-4 border-2 border-gray-600 border-solid rounded-lg dark:border-gray-700 h-42 ">
          {/* Your content goes here */}
          <Status/>
        </div>
        {/* <hr className='mt-2 border-black' /> */}
      </div>
      <div className="p-4 sm:ml-64 bg-gray-800 text-white" >
        <Myinterviews/>
      </div>
    </div>
  );
};

export default Dashboard;

// 1f1b28