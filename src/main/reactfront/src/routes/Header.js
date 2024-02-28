import React from "react";
import logo from './nobglogo.png';


const Page1 = () => {
    return <h1>페이지 1</h1>;
};

const Page2 = () => {
    return <h1>페이지 2</h1>;
};


export default function Header({isChecked, setIsChecked}) {
    const handleToggle = () => {
        setIsChecked(!isChecked);
    };
    return (
        <div className={"header"}>
            <a href={"/main"}> <img className={"logo"} src={logo}/></a>
            <button id={"btnlastmonth"}>←</button>
            yyyy.MM
            <button id={"btnnextmonth"}>→</button>
            <div>
                <label className={"toggleSwitch"}>
                    <input type="checkbox" checked={isChecked} onChange={handleToggle}/>
                    <span>캘린더/검색</span>
                </label>

            </div>
        </div>

    )
}

