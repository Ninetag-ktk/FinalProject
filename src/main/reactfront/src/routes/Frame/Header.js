// Header.js
import React, {useContext} from "react";
import logo from '../nobglogo.png';
import axios from "axios";
import {MyContext} from './Main';

export default function Header({onPrevButtonClick, onNextButtonClick, currentTitle, today}) {
    const {isSearchVisible, handleToggle} = useContext(MyContext);

    const handleCheckboxChange = () => {
        handleToggle();
    };

    const handleTest = () => {
        axios.post("/categories", window.sessionStorage.getItem("observe"),
            //     {
            //     observe: sessionStorage.getItem("observe"),
            //     date: currentTitle,
            // }
        )
            .then(function (response) {
                console.log(response.data);
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
            {/*<button type={"button"} id={"testButton"} onClick={handleTest}>테스트 버튼</button>*/}
        </div>
    );
}
