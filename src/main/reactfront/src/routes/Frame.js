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
import LeftBar from "./LeftBar";
import Header from "./Header";
import Center from "./Center";

function Frame() {

    return (
        <div className={"Frame"}>
            <nav>
                <Link to="/leftBar">LeftBar</Link> | <Link to="/header">Header</Link> |{" "}
                <Link to="/center">Center</Link>
            </nav>
            <Routes>
                <Route path="/frame/leftBar" element={<LeftBar/>}/>
                <Route path="/header" component={<Header/>}/>
                <Route path="/center" component={<Center/>}/>
            </Routes>
        </div>
    )
}

export default Frame;