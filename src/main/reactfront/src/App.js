import React, {useState, useEffect} from 'react';
import axios from 'axios'
import logo from './temp_logo.png'
import {
    createBrowserRouter,
    createRoutesFromElements,
    BrowserRouter as Router,
    Route,
    RouterProvider,
    Routes
} from "react-router-dom";
import './App.css';
import Empty from "./routes/Empty";
import Frame from "./routes/Frame";

function App() {

    return (
        <div className={"App"}>
            <Router>
                <Routes>
                    <Route path="/" element={<Empty/>}/>
                    <Route path="/frame" element={<Frame/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;