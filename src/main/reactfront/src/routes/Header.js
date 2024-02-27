import React from "react";
import logo from './nobglogo.png';
export default function Header () {
    return (
        <div className={"header"}>
            <a href={"/main"}> <img className={"logo"} src={logo}/></a>
                <button id={"btnlastmonth"}>←</button>
                yyyy.MM
                <button id={"btnnextmonth"}>→</button>
                <button id={"menubtn"}>menu</button>
        </div>

)
}

