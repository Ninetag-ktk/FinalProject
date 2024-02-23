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


const Header = () =>{
    return(
        <h1>Header 화면 입니다.</h1>
    );
};

export default Header;