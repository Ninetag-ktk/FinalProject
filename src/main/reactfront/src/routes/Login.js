import React, {useState} from 'react';
import './css/Login.css';
import logo from './temp_logo.png'
import {get, post} from "axios";
import {redirect} from "react-router-dom";



export default function Login ()  {
    const handleValueChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]:e.target.value
        });
    }

    const [login, setLogin] = useState({
        id : "",
        pw : "",

    });

    const handleSubmit = (event) => {
        event.preventDefault(); // 이벤트가 첫 입력에 중복되지 않게 하는 명령어

        // const formData = new FormData(event.target); // 이벤트 안에 발생하는 DOM요소들을 의미함
        //
        // const params = new URLSearchParams(formData); // 쿼리(?a=~~&b=~~~)문에서 키-값을 추가, 삭제, 수정, 값을 객체변환, 객체를 값 변환하는데 사용

        // fetch(`/main?${params.toString()}`, {
        //     method: "GET",
        // }).then((response) => {
        //     window.location.href = `/main?${params.toString()}`;
        // });

        fetch(`/login`, {
            method: "POST",
            headers : {
                "Content-Type":"application/json; charset=utf-8"
            },
            body: JSON.stringify(login),
        }).then(res=>{
            console.log(res);
            window.location.href = "/main";
        })
    };

    return (
        <div className={"login-main"}>
            <div className={"Logoclass"}>
                <img  src={logo}/>
            </div>

            <div className={"logininput"}>
                <form className={"loginForm1"} action={"/main"} onSubmit={handleSubmit}>
                    <input type={"text"} className={"inputtext"} name={"id"} onChange={handleValueChange} placeholder={"email"}/>
                    <input type={"password"} className={"inputtext"} name={"pw"}  onChange={handleValueChange} placeholder={"password"} />
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

