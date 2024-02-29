import React, {useState} from 'react';
import './css/Login.css';
import logo from './temp_logo.png'
import {get, post} from "axios";
import {redirect} from "react-router-dom";


export default function Login() {

    const [message, setMessage] = useState("");

    const [login, setLogin] = useState({
        id: "",
        pw: "",
    });

    const handleValueChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
    }

    const cookies = {};



    const handleSubmit = (event) => {
        event.preventDefault(); // 이벤트가 첫 입력에 중복되지 않게 하는 명령어

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json; charset=utf-8",
            },
            body: JSON.stringify(login),
        }).then(res => res.text()

            // if (document.cookie != null) {
            //     document.cookie(cookie => {
            //         const [key, value] = cookie.split('=');
            //         cookies[key] = value;
            //     });
            // } else {
            //     alert("쿠키없음")
            // }
        )
            .then( message => {
                setMessage(message);
                    if (message === "로그인") {
                        // alert(cookies[login.id])
                        alert(message)
                        window.location.href = "/main";
                    } else {
                        alert(message);
                    }
                }
            )
    };

    return (
        <div className={"login-main"}>
            <div className={"Logoclass"}>
                <img src={logo}/>
            </div>

            <div className={"logininput"}>
                <form className={"loginForm1"} action={} onSubmit={handleSubmit}>
                    <input type={"text"} className={"inputtext"} name={"id"} onChange={handleValueChange}
                           placeholder={"email"}/>
                    <input type={"password"} className={"inputtext"} name={"pw"} onChange={handleValueChange}
                           placeholder={"password"}/>
                    <button className={"btn"}>로그인</button>

                </form>
                <form className={"loginForm1"} action={"/create"}>
                    <button className={"btn"}>회원가입</button>
                </form>
                <hr/>
                <button id={"btn"}>google계정으로 로그인</button>
            </div>

        </div>
    )
}

