import React, { useContext } from "react";
import logo from './nobglogo.png';
import axios from "axios";
import { MyContext } from './Main';

export default function Header({ onPrevButtonClick, onNextButtonClick, onAddEventButtonClick }) {
    const { isSearchVisible, handleToggle } = useContext(MyContext);

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
            <a href={"/main"}> <img className={"logo"} src={logo} alt="Logo" /></a>
            <button id={"prevBtn"} onClick={onPrevButtonClick}>←</button>
            <h2 id="currentMonth"></h2>
            <button id={"nextBtn"} onClick={onNextButtonClick}>→</button>
            <div>
                <button type={"button"} onClick={onAddEventButtonClick}>일정 추가</button>
                <label className={"toggleSwitch"}>
                    <input type="checkbox" checked={isSearchVisible} onChange={handleCheckboxChange} />
                    <span>캘린더/검색</span>
                </label>
                <button type={"button"} id={"googletest"} onClick={handleGoogleTest}>구글 API 테스트 버튼</button>
            </div>
        </div>
    );
}
