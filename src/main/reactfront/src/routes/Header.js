import React, { useContext } from "react";
import logo from './nobglogo.png';

import Main,{ MyContext } from "./Main";
import { useNavigate  } from "react-router-dom";





export default function Header () {
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

    return (
        <div className={"header"}>
            <a href={"/main"}> <img className={"logo"} src={logo}/></a>
            <button id={"btnlastmonth"}>←</button>
            yyyy.MM
            <button id={"btnnextmonth"}>→</button>
            <div>
            <label className={"toggleSwitch"}>
                    <input type="checkbox" checked={isMain} onChange={handleCheckboxChange} />
                <span>캘린더/검색</span>
            </label>

            </div>
        </div>

    )
}

