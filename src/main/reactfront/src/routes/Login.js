import React from 'react';

import './css/Login.css';
import logo from './temp_logo.png'
import {get, post} from "axios";
import {redirect} from "react-router-dom";



export default function Login ()  {

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const params = new URLSearchParams(formData);

        fetch(`/main?${params.toString()}`, {
            method: "GET",
        }).then((response) => {
            window.location.href = `/main?${params.toString()}`;
        });
    };

    return (
        <div className={"login-main"}>
            <div className={"Logoclass"}>
                <img  src={logo}/>
            </div>

            <div className={"logininput"}>
                <form className={"loginForm1"} action={"/main"} onSubmit={handleSubmit}>
                    <input type={"text"} className={"inputtext"} name={"id"} placeholder={"email"}/>
                    <input type={"password"} className={"inputtext"} name={"pw"} placeholder={"password"} />
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

