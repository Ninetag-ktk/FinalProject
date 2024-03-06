// Main.js
import React, { useState } from "react";
import Header from "./Header";
import LeftBar from "./LeftBar";
import Search from "./Search";
import Center from "./Center";

export const MyContext = React.createContext();

export default function Main() {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [calendar, setCalendar] = useState(null);
    const [calendarTitle, setCalendarTitle] = useState("");
    const [events, setEvents] = useState([]);

    function handleToggle() {
        setIsSearchVisible(!isSearchVisible);
    }

    const handlePrevButtonClick = () => {
        if (calendar) {
            calendar.prev();
            setTitle(calendar.view.title);
        }
    };

    const handleNextButtonClick = () => {
        if (calendar) {
            calendar.next();
            setTitle(calendar.view.title);
        }
    };

    const gotoday = () => {
        if (calendar) {
            calendar.today();
            setTitle(calendar.view.title);
        }
    };

    const setTitle = (title) => {
        setCalendarTitle(title);
    };

    const handleSaveEvent = (event) => {
        setEvents([...events, event]);
};

    return (
        <div className={"Main"}>
            <MyContext.Provider value={{ isSearchVisible, handleToggle }}>
                <div className={"frame"}>
                    <Header
                        onPrevButtonClick={handlePrevButtonClick}
                        onNextButtonClick={handleNextButtonClick}
                        today={gotoday}
                        currentTitle={calendarTitle}
                    />
                    <div className={"leftOUT"}>
                        <LeftBar onSave={handleSaveEvent} />
                        {isSearchVisible ? <Search /> : <Center setMainCalendar={setCalendar} setTitle={setTitle} events={events} />}
                    </div>
                </div>
            </MyContext.Provider>
        </div>
    );
}
