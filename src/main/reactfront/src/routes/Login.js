import React, {useState} from 'react';
import logo from './temp_logo.png'
import {json} from "react-router-dom";


export default function Login() {
    const [loginInfo, setLoginInfo] = useState({
        id: "",
        pw: "",
    });



    const handleLogin = async () => {
        const response = await fetch("/user/login", {
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

    const [logoutInfo, setLogoutInfo] = useState({
        observe: sessionStorage.getItem("observe"),
    });

    const handleLogout = async () => {
        const response = await fetch("/user/allLogout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json; charset=utf-8",
            },
            body: JSON.stringify(logoutInfo),
        });
        const result = await response.json();
        if (result.code === "200") {
            // 전체 로그아웃 성공 처리
            window.sessionStorage.setItem("observe", null);
            window.location.href = "";
        } else {
            // 전체 로그아웃 실패 처리
            alert(result.body);
        }
    };

    const handleGoogleLogin = async () => {
        const response = await fetch("/google/login", {
            mode: "no-cors",
        }); // fetch 호출이 아예 안됨
        console.log(response.json());
        alert(response.json());
        window.location.href = response.json();
    };

    return (
        <div className={"loginall"}>
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
                        <div className={"autologin"}>
                        <input type={"checkbox"}/>로그인유지
                        </div>
                        <button className={"btn"} type={"submit"} onClick={handleLogin}>로그인</button>
                    </div>
                    <a href={"/create"}>
                    <button className={"btn"}>회원가입</button>
                        </a>
                    <hr/>
                    <button className={"btn"} onClick={handleGoogleLogin}>google계정으로 로그인</button>
                </div>
            </div>
        </div>
    )
}