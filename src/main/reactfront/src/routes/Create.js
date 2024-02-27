// import React from "react";
// import { useState } from "react"
// import {
//     useNavigate
// } from "react-router-dom";
//
//
// export default function Create(){
//
//     const navigate = useNavigate();
//
//     const [text,setText] = useState('');
//
//
//
//     return (
//
//         <div className={"join"}>
//                 <input
//                     type={"text"}
//                     className={"id logininput"}
//                     placeholder={"이메일 형식"}
//                     name={"email"}
//                    />
//                 <button>ID 중복 확인</button>
//
//                 <input
//                     type={"text"}
//                     className={"PW logininput"}
//                     placeholder={"비밀번호"}
//                     name={"password"}
//                 />
//                 <input
//                     type={"text"}
//                     className={"PW check"}
//                     placeholder={"비밀번호 재입력"}
//                     name={"passwordcheck"}
//                 />
//                 <input
//                     type={"text"}
//                     className={"inputtext"}
//                     placeholder={"닉네임"}
//                     name={"nickname"}
//                 />
//                 <button>회원가입</button>
//         </div>
//
//
// )
// }
import React, { useState , useEffect } from 'react';
import Parsley from 'parsleyjs';
import $ from 'jquery';
import './Create.css';


const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Parsley.js 유효성 검사 (초기화가 완료된 가정)
        if (!$('#signup-form').parsley().validate()) {
            return;
        }


    };

    useEffect(() => {
        $('#signup-form').parsley();
    }, []);

    return (
        <form id="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">닉네임:</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="사용자 이름을 입력하세요"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    data-parsley-required
                    data-parsley-minlength="1"
                    data-parsley-maxlength="20"
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">이메일:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="이메일 주소를 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    data-parsley-required
                    data-parsley-type="email"
                    data-parsley-remote-email
                    data-parsley-remote-email-message="이미 사용 중인 이메일 주소입니다."
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">비밀번호:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    data-parsley-required
                    data-parsley-minlength="8"
                    data-parsley-uppercase="1"
                    data-parsley-lowercase="1"
                    data-parsley-number="1"
                    data-parsley-special="1"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password-confirm">비밀번호 확인:</label>
                <input
                    type="password"
                    name="password-confirm"
                    id="password-confirm"
                    placeholder="비밀번호를 다시 입력하세요"
                    data-parsley-required
                    data-parsley-equalto="#password"
                    data-parsley-error-message="비밀번호가 일치하지 않습니다."
                />
            </div>
            <button type="submit">회원가입</button>
        </form>
    );
};

export default SignupForm;
