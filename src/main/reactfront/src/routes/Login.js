import React, {useEffect, useState} from 'react';
import logo from './temp_logo.png'
import {useNavigate} from "react-router-dom";
import axios from "axios";


export default function Login() {

    // 자동 로그인 기능
    const redirect = useNavigate();

    useEffect(() => {
        // 로그인 이력이 있다면(세션에 저장된 내용이 있다면)
        // 바로 main으로 이동
        if (window.sessionStorage.getItem("observe")) {
            redirect("/main");
        }

        // 로그인된 이력이 없지만, 자동로그인 기록이 있다면(로컬에 저장된 내용이 있다면)
        // 옵저브 토큰 검사
        if (window.localStorage.getItem("observe")) {
            axios("/user/checkToken", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Accept": "application/json; charset=utf-8",
                },
                data: window.localStorage.getItem("observe"),
            }).then(response => {
                    if (response.data == true) {
                        window.sessionStorage.setItem("observe", window.localStorage.getItem("observe"));
                        redirect("/main");
                    } else {
                        window.localStorage.removeItem("observe");
                    }
                })
        }
    }, []);

    const [loginInfo, setLoginInfo] = useState({
        id: "",
        pw: "",
    });
    const [autoLogin, setAutoLogin] = useState(false);

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
            redirect(`/check?autologin=${autoLogin}&observe=${result.body}`,);
        } else {
            // 로그인 실패 처리
            alert(result.body);
            // window.location.href = "/";
        }
    };

    const handleGoogleLogin = async () => {
        const response = await fetch("/google/login", {
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json; charset=utf-8",
            },
        });
        const result = await response.json();
        window.location.href = result.redirect;
    };

    return (
        <div className={"loginall"}>
            <div className={"login-main"}>
                <div className={"Logoclass"}>
                    <img src={logo}/>
                </div>
                <div className={"logininput"}>
                    <div className={"loginForm"}>
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
                        <input
                            type={"checkbox"} checked={autoLogin}
                            onChange={(e) => setAutoLogin(e.target.checked)}
                        />로그인유지
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

