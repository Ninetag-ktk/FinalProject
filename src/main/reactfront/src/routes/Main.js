// Main.js
import React, { useState } from "react";
import Header from "./Header";
import LeftBar from "./LeftBar";
import Search from "./Search";
import MainContent from "./MainContent";
import Center from "./Center";

export const MyContext = React.createContext();

export default function Main() {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    function handleToggle() {
        setIsSearchVisible(!isSearchVisible);
    }

    function handlePrevMonth() {
        let newMonth = currentMonth - 1;
        let newYear = currentYear;
        if (newMonth < 0) {
            newMonth = 11;
            newYear = currentYear - 1;
        }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    }

    function handleNextMonth() {
        let newMonth = currentMonth + 1;
        let newYear = currentYear;
        if (newMonth > 11) {
            newMonth = 0;
            newYear = currentYear + 1;
        }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    }

    return (
        <div className={"Main"}>
            <MyContext.Provider value={{ isSearchVisible, handleToggle }}>
                <div className={"3dan"}>
                    <Header onNextMonthClick={handleNextMonth} onPrevMonthClick={handlePrevMonth} />
                    <div className={"leftOUT"}>
                        <LeftBar />
                        {isSearchVisible ? <Search /> : <Center />}
                    </div>
                </div>
            </MyContext.Provider>
        </div>
    );
}