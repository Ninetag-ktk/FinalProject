import React, {useState, useEffect} from 'react';
import axios from 'axios'
import logo from './temp_logo.png'
import {
    createBrowserRouter,
    Route, RouterProvider,
} from "react-router-dom";
import './App.css';
import ReactDOM from "react-dom/client";
import Empty from './routes/Empty'
import Login from "./routes/Login";
import Create from "./routes/Create";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Empty />,
        errorElement : <p>Not Found</p>,
        children : [
            {index : true, element: <Login />},
            {path : '/create',element:<Create />}
        ]
    }
]);




export default function App(){
    return<RouterProvider router={router}/>
}
