// Main.js
import React, {useEffect, useState} from "react";
import Header from "./Header";
import LeftBar from "./LeftBar";
import Search from "./Search";
import Center from "./Center";
import {useNavigate} from "react-router-dom";

export const MyContext = React.createContext();

export default function Main() {
    const redirect = useNavigate()

    useEffect(() => {
        // alert(window.sessionStorage.getItem("observe"));
        if (window.sessionStorage.getItem("observe") == null) {
            redirect("/");
        }
    }, []);

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [calendar, setCalendar] = useState(null);
    const [calendarTitle, setCalendarTitle] = useState("");
    const [events, setEvents] = useState([]);

    let observe = {observe: sessionStorage.getItem("observe")}

    const SucessLogin = async () => {
        const response = await fetch("/google/updateCheck", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json; charset=utf-8",
            },
            body: JSON.stringify(observe),
        });
    };





    function handleToggle() {
        setIsSearchVisible(!isSearchVisible);
    }







    let ymData = {
        year: 0,
        month: 0,
        observe: "",
    };

    //전달 버튼
    const handlePrevButtonClick = () => {
        if (calendar) {
            calendar.prev();
            setTitle(calendar.view.title);
            const nowDate = calendar.view.currentStart;
            console.log(`현재 년도: ${nowDate.getFullYear()} / ${nowDate.getMonth() + 1}`);
            ymData = ({
                year: calendar.view.currentStart.getFullYear(),
                month: calendar.view.currentStart.getMonth() + 1,
                observe: sessionStorage.getItem("observe")
            });
            console.log(ymData)
        }
    };

    //담달 버튼
    const handleNextButtonClick = () => {
        if (calendar) {
            calendar.next();
            setTitle(calendar.view.title);
            const nowDate = calendar.view.currentStart;
            console.log(`현재 년도: ${nowDate.getFullYear()} / ${nowDate.getMonth() + 1}`);
            ymData = ({
                year: calendar.view.currentStart.getFullYear(),
                month: calendar.view.currentStart.getMonth() + 1,
                observe: sessionStorage.getItem("observe")
            });
            console.log(ymData)
        }
    };


    const handleYMData = async () => {
        const response = await fetch("/notes/ymdata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json; charset=utf-8",
            },
            body: JSON.stringify(ymData),
        });
    };


    const handleNextButtonClick1 = () => {
        handleNextButtonClick();
        handleYMData();
    };

    const handlePrevButtonClick1 = () => {
        handlePrevButtonClick();
        handleYMData();
    }





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
