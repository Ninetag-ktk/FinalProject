// Header.js
import React, {useContext} from "react";
import logo from './nobglogo.png';
import axios from "axios";
import {MyContext} from './Main';

export default function Header({onPrevButtonClick, onNextButtonClick, currentTitle, today}) {
    const {isSearchVisible, handleToggle} = useContext(MyContext);


    const handleCheckboxChange = (event) => {
        handleToggle();
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
            <div>
                <a href={"/main"}> <img className={"logo"} src={logo} alt="Logo"/></a>
            </div>
            <div>
                <button id={"prevBtn"} onClick={onPrevButtonClick}>←</button>
            </div>
            <div>
                <div id="currentMonth" className="headLabel">{currentTitle}</div>
                {/* 수정: currentMonth prop 사용 */}
            </div>
            <div>
                <button id={"nextBtn"} onClick={onNextButtonClick}>→</button>
            </div>
            <div>
                <button id={"today"} onClick={today}>오늘</button>
            </div>
            <div>
                <label className={"toggleSwitch"}>
                    <input type="checkbox" checked={isSearchVisible} onChange={handleCheckboxChange}/>
                    <span>캘린더/검색</span>
                </label>
            </div>
            <button type={"button"} id={"googletest"} onClick={handleGoogleTest}>구글 API 테스트 버튼</button>
        </div>
    );
}
