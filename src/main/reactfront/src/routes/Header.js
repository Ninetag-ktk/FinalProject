import React, {useEffect, useState} from "react";
import logo from './nobglogo.png';






export default function Header () {

    return (
        <div className={"header"}>
            <a href={"/main"}> <img className={"logo"} src={logo}/></a>
            <button id={"btnlastmonth"}>←</button>
            yyyy.MM
            <button id={"btnnextmonth"}>→</button>

            <label className={"toggleSwitch"}>
                <input role={"switch"} type={"checkbox"}/>
                <span className="toggleButton"></span>
            </label>
        </div>

    )
}

