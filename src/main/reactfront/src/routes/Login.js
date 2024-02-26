import React from 'react';

import './App.css';
import logo from './temp_logo.png'
import {
    Link
} from "react-router-dom";
import Create from "./Create";


export default function Login ()  {

    return (
        <div className={"login-main"}>
            <div className={"Logoclass"}>
                <img  src={logo}/>
            </div>

            <div className={"logininput"}>
                <form className={"loginForm1"} action={"/main"}>
                    <input type={"text"} className={"inputtext"} placeholder={"ex)XXXXXX@xxxxxx.com"}/>
                    <input type={"password"} className={"inputtext"} placeholder={"password"} />
                    <button id={"btn"}>로그인</button>

                </form>
                <Link to="/create">회원가입</Link>
                <hr/>
                <button id={"btn"}>google계정으로 로그인</button>
            </div>

        </div>
    )
}

