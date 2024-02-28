import React from "react";
import axios from 'axios'

import logo from './temp_logo.png'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Routes,
    Link
} from "react-router-dom";

const LeftBar = () =>{
    return(
        <h1>LeftBar 입니다.</h1>
    );
};

export default LeftBar;