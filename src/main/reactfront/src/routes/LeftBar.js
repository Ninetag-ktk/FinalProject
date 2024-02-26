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

export default function  LeftBar  () {
    return(
        <div>
            캘린더 카테고리 생성
            
            오늘 할일
            일정
        </div>
    )
}

