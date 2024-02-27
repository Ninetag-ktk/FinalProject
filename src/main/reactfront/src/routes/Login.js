import React from 'react';

import './css/Login.css';
import logo from './temp_logo.png'



export default function Login ()  {

    return (
        <div className={"login-main"}>
            <div className={"Logoclass"}>
                <img  src={logo}/>
            </div>

            <div className={"logininput"}>
                <form className={"loginForm1"} action={"/main"}>
                    <input type={"text"} className={"inputtext"} placeholder={"email"}/>
                    <input type={"password"} className={"inputtext"} placeholder={"password"} />
                    <button id={"btn"}>로그인</button>

                </form >
                <form className={"loginForm1"} action={"/create"}>
                <button id={"btn"}>회원가입</button>
                </form>
                <hr/>
                <button id={"btn"}>google계정으로 로그인</button>
            </div>

        </div>
    )
}

