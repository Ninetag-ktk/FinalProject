import React, { useState } from "react";
import Header from "./Header";
import LeftBar from "./LeftBar";
import Search from "./Search";
import Center from "./Center";

export const MyContext = React.createContext();

export default function Main() {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [calendar, setCalendar] = useState(null);

    function handleToggle() {
        setIsSearchVisible(!isSearchVisible);
    }

    const handlePrevButtonClick = () => {
        if (calendar) {
            calendar.prev();
        }
    };

    const handleNextButtonClick = () => {
        if (calendar) {
            calendar.next();
        }
    };

    const handleAddEventButtonClick = () => {
        // Handle add event button click functionality
    };

    return (
        <div className={"Main"}>
            <MyContext.Provider value={{ isSearchVisible, handleToggle }}>
                <div className={"3dan"}>
                    <Header
                        onPrevButtonClick={handlePrevButtonClick}
                        onNextButtonClick={handleNextButtonClick}
                        onAddEventButtonClick={handleAddEventButtonClick}
                    />
                    <div className={"leftOUT"}>
                        <LeftBar />
                        {isSearchVisible ? <Search /> : <Center setMainCalendar={setCalendar} />}
                    </div>
                </div>
            </MyContext.Provider>
        </div>
    );
}
