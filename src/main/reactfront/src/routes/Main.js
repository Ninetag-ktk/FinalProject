import React, {useState, createContext} from "react";
import {Outlet, useLocation} from "react-router-dom";
import Header from "./Header";
import LeftBar from "./LeftBar";
import Search from "./Search";


export default function Main() {
    const MyContext = createContext(null);
    const [isMain, setIsMain] = useState(true);

    function handleToggle() {
        setIsMain(!isMain);
    }

    return (
        <div className={"Main"}>
            <Header/>
            <LeftBar/>
            <Outlet>
                {isMain ? <Main/> : <Search/>}
            </Outlet>
        </div>
    )
}
