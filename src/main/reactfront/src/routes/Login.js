import React,{useState} from "react";
import logo from "../temp_logo.png";
import App from "../App";

const Login = () => {

    return (
        <div className={"login-main"}>
            <div className={"Logoclass"}>
                <img src={logo}/>
            </div>

            <div className={"logininput"}>
                <form className={"loginForm1"} action={"naver.com"}>
                    <input type={"text"} className={"inputtext"} placeholder={"ex)XXXXXX@xxxxxx.com"}/>
                    <input type={"text"} className={"inputtext"} placeholder={"password"}/>
                    <button>로그인</button>
                </form>
                <hr/>
                <button>google계정으로 로그인</button>
            </div>
        </div>
    );




};
export default Login;