import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Interview from '../pages/Interview';
import List from '../pages/List';

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Signup/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/interviews" element={<Interview/>}/>
            <Route path="/interview/:module" element={<Interview/>}/>
            <Route path="/list" element={<List/>}/>
        </Routes>
    </div>
  )
}

export default AllRoutes