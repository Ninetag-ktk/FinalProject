import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import Header from "./Header";
import LeftBar from "./LeftBar";
import Search from "./Search";


export default function Main() {
    const [isChecked, setIsChecked] = useState(false);
    useEffect(() => {
        console.log(`isChecked: ${isChecked}`);
    }, [isChecked]);
    return (
        <div className={"Main"}>
            <Header isChecked={isChecked} setIsChecked={setIsChecked}/>
            <LeftBar/>
            <Outlet>
                {Header.isChecked ? <Main/> : <Search/>}
            </Outlet>
        </div>
    )
}
