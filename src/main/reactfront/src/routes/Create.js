import React from "react";
import { useState } from "react"
import axios from 'axios'
import logo from './temp_logo.png'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Routes,
    Link,
    useNavigate
} from "react-router-dom";

export default function Create(){

    const navigate = useNavigate();

    const [text,setText] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        setText('');
        navigate(`/create/${text}`);
    }
    return(
        <div>
            create

        </div>
    )
}

