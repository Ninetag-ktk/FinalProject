import React from 'react';
import {
    createBrowserRouter,
    Route, RouterProvider,
} from "react-router-dom";
import './App.css';
import Empty from './routes/Empty'
import Login from "./routes/Login";
import Create from "./routes/Create";
import Main from "./routes/Main";
import Center from "./routes/Center";
import Search from "./routes/Search";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Empty />,
        errorElement : <p>Not Found</p>,
        children : [
            {index : true, element: <Login />},
            {path : '/create',element:<Create />},
            {path : '/main',element:<Main />}
        ]
    },
    {
        path: "/main",
        element: <Main />,
        errorElement : <p>Not Found</p>,
        children : [
            {index : true, element: <Center />},
            {path : '/main/search',element:<Search />},
        ]
    }
]);




export default function App(){

    return<RouterProvider router={router}/>
}
