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

    return(
        <div className={"join"}>
            <form className={"joinForm1"} action={""}>
                <input type={"text"} className={"inputtext"} placeholder={"ID"}/>
                <button>ID 중복 확인</button>
                <input type={"text"} className={"inputtext"} placeholder={"PW"}/>
                <input type={"text"} className={"inputtext"} placeholder={"PW확인"}/>
                <input type={"text"} className={"inputtext"} placeholder={"닉네임"}/>
                
            </form>
        </div>
    )
}

