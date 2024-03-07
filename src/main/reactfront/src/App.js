import React from 'react';
import {
    createBrowserRouter,
    Route, RouterProvider,
} from "react-router-dom";
import './App.css';
import Empty from './routes/Empty/Empty'
import Login from "./routes/Empty/Login";
import Join from "./routes/Empty/Join";
import Main from "./routes/Frame/Main";
import Center from "./routes/Frame/Outlet/Center";
import Search from "./routes/Frame/Outlet/Search";
import Info from "./routes/Frame/Outlet/Info";
import LoginCheck from "./routes/temp_LoginCheck"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Empty />,
        errorElement : <p>Not Found</p>,
        children : [
            {index : true, element: <Login />},
            {path : '/join',element:<Join />},
            {path : '/main',element:<Main />},
            {path : '/check', element: <LoginCheck/>}
        ]
    },
    {
        path: "/main",
        element: <Main />,
        errorElement : <p>Not Found</p>,
        children : [
            {index : true, element: <Center />},
            {path : '/main/search',element:<Search />},
            {path : '/main/info',element:<Info />}

        ]
    },
    {
        path: "/info",
        element: <Info />,
        errorElement : <p>Not Found</p>,
        children : [
            {index : true, element: <Info />}

        ]
    },
    {
        path: "/info",
        element: <Info />,
        errorElement : <p>Not Found</p>,
        children : [
            {index : true, element: <Info />}

        ]
    }
]);




export default function App(){

    return<RouterProvider router={router}/>
}

