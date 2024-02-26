import React, {useState, useEffect} from 'react';
import axios from 'axios'
import logo from './temp_logo.png'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    BrowserRouter as Router,
    RouterProvider,
    Routes,
    Outlet
} from "react-router-dom";
import Login from "./Login";
import Create from "./Create";


function Empty() {

    return (
        <div className="Empty">

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/create" element={<Create />} />
            </Routes>

        </div>

    );
}

export default Empty;