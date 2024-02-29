import React, {useContext, useEffect, useState} from "react";
import logo from './nobglogo.png';
import {MyContext} from "./Main";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Header() {
    const {isMain, handleToggle} = useContext(MyContext);
    const navigate = useNavigate();


    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        // Update the displayed month and year on initial render and after changes
        const monthName = ["1월", "2월", "3월", "4월", "5월", "6월",
            "7월", "8월", "9월", "10월", "11월", "12월"][currentMonth];
        document.getElementById("currentMonth").innerHTML = `${currentYear}.${monthName} `;
    }, [currentMonth, currentYear]);

    const handlePrevBtnClick = () => {
        let newMonth = currentMonth - 1;
        if (newMonth < 0) {
            newMonth = 11;
            setCurrentYear(currentYear - 1);
        }
        setCurrentMonth(newMonth);
    };

    const handleNextBtnClick = () => {
        let newMonth = currentMonth + 1;
        if (newMonth > 11) {
            newMonth = 0;
            setCurrentYear(currentYear + 1);
        }
        setCurrentMonth(newMonth);
    };

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
    }

    return (
        <div className={"header"}>
            <a href={"/main"}> <img className={"logo"} src={logo}/></a>
            <button id={"prevBtn"} onClick={handlePrevBtnClick}>←</button>
            <h2 id="currentMonth"></h2>
            <button id={"nextBtn"} onClick={handleNextBtnClick}>→</button>
            <div>
                <label className={"toggleSwitch"}>
                    <input type="checkbox" checked={isMain} onChange={handleCheckboxChange}/>
                    <span>캘린더/검색</span>
                </label>
                <button type={"button"} id={"googletest"} onClick={() => {
                    handleGoogleTest()
                }}>구글 API 테스트 버튼
                </button>
            </div>
        </div>

    )
}