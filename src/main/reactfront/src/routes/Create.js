import React from "react";
import { useState } from "react"
import {
    useNavigate
} from "react-router-dom";


export default function Create(){

    const navigate = useNavigate();

    const [text,setText] = useState('');



    return(
        <div className={"join"}>
                <input
                    type={"text"}
                    className={"id logininput"}
                    placeholder={"이메일 형식"}
                    name={"email"}
                   />
                <button>ID 중복 확인</button>

                <input
                    type={"text"}
                    className={"PW logininput"}
                    placeholder={"비밀번호"}
                    name={"password"}
                />
                <input
                    type={"text"}
                    className={"PW check"}
                    placeholder={"비밀번호 재입력"}
                    name={"passwordcheck"}
                />
                <input
                    type={"text"}
                    className={"inputtext"}
                    placeholder={"닉네임"}
                    name={"nickname"}
                />
                <button>회원가입</button>
        </div>
    )
}

