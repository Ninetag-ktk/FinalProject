import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import Header from "./Header";
import LeftBar from "./LeftBar";
import Search from "./Search";
import MainContent from "./MainContent";

export const MyContext = React.createContext();

export default function Main() {
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    function handleToggle() {
        setIsSearchVisible(!isSearchVisible);
    }

    return (
        <div className={"Main"}>
            <MyContext.Provider value={{isSearchVisible, handleToggle}}>
                <Header/>
                <LeftBar/>
                <Outlet>
                    {isSearchVisible ? <Search/> : <MainContent/>}
                </Outlet>
            </MyContext.Provider>
        </div>
    );
}
