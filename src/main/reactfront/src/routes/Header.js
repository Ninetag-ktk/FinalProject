// Header.js

import React, { useContext } from "react";
import logo from './nobglogo.png';
import { MyContext } from "./Main";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header({ onNextMonthClick, onPrevMonthClick }) {
    const { isMain, handleToggle } = useContext(MyContext);
    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        handleToggle();
        if (event.target.checked) {
            navigate("/main/search");
        } else {
            navigate("/main");
        }
    };

    const handleGoogleTest = () => {
        axios.post("/google/test", {
            observe: sessionStorage.getItem("observe"),
        })
            .then(function (response) {
                console.log(response);
            });
    };

    return (
        <div className={"header"}>
            <a href={"/main"}> <img className={"logo"} src={logo} /></a>
            <button id={"prevBtn"} onClick={onPrevMonthClick}>←</button>
            <h2 id="currentMonth"></h2>
            <button id={"nextBtn"} onClick={onNextMonthClick}>→</button>
            <div>
                <label className={"toggleSwitch"}>
                    <input type="checkbox" checked={isMain} onChange={handleCheckboxChange} />
                    <span>캘린더/검색</span>
                </label>
                <button type={"button"} id={"googletest"} onClick={handleGoogleTest}>구글 API 테스트 버튼</button>
            </div>
        </div>
    );
}