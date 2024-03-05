import React, {useState, useEffect} from 'react';
import Parsley from 'parsleyjs';
import $ from 'jquery';
import logo from './temp_logo.png';



export default function SignupForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Parsley.js 유효성 검사 (초기화가 완료된 가정)
        if (!$('#signup-form').parsley().validate()) {
            return;
        }

        // 회원가입 API 호출
        // ...

    };


    useEffect(() => {
        $('#signup-form').parsley();
    }, []);

    return (
        <div className={"create"}>

                <a href={"/main"}> <img className={"createlogo"} src={logo}/> </a>



            <form id="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">닉네임</label>
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
                    <label htmlFor="password">비밀번호(대문자,소문자,숫자,특수문자를 포함해야합니다.)</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        data-parsley-minlength="8"
                        data-parsley-uppercase="1"
                        data-parsley-lowercase="1"
                        data-parsley-number="1"
                        data-parsley-special="1"
                        data-parsley-required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password-confirm">비밀번호 확인</label>
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
                <button type="submit">회원정보저장</button>
            </form>
            <button>회원 탈퇴</button>

        </div>
    );
}