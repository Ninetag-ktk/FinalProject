import React, {useState} from 'react';
import './css/Login.css';
import logo from './temp_logo.png'
import {json} from "react-router-dom";


export default function Login() {
    const [loginInfo, setLoginInfo] = useState({
        id: "",
        pw: "",
    });

    const handleLogin = async () => {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json; charset=utf-8",
            },
            body: JSON.stringify(loginInfo),
        });
        const result = await response.json();
        if (result.code === "200") {
            // 로그인 성공 처리
            window.sessionStorage.setItem("observe", result.body);
            window.location.href = "/main";
        } else {
            // 로그인 실패 처리
            alert(result.body);
            // window.location.href = "/";
        }
    };

    return (
        <div className={"login-main"}>
            <div className={"Logoclass"}>
                <img src={logo}/>
            </div>
            <div className={"logininput"}>
                <div className={"loginForm1"}>
                    <input
                        type="text"
                        className="inputtext"
                        name="id"
                        placeholder="email"
                        value={loginInfo.id}
                        onChange={(e) => setLoginInfo({...loginInfo, id: e.target.value})}
                    />
                    <input
                        type="password"
                        className="inputtext"
                        name="pw"
                        placeholder="password"
                        value={loginInfo.pw}
                        onChange={(e) => setLoginInfo({...loginInfo, pw: e.target.value})}
                    />
                    <button className={"btn"} type={"submit"} onClick={handleLogin}>로그인</button>
                </div>
                <button className={"btn"}>회원가입</button>
                <hr/>
                <button className={"btn"}>google계정으로 로그인</button>
            </div>

        </div>
    )
}

