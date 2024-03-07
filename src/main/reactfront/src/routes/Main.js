// Main.js
import React, {useEffect, useState} from "react";
import Header from "./Header";
import LeftBar from "./LeftBar";
import Search from "./Search";
import Center from "./Center";
import {useNavigate} from "react-router-dom";

export const MyContext = React.createContext();

export default function Main() {
    const redirect = useNavigate();

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [calendar, setCalendar] = useState(null);
    const [calendarTitle, setCalendarTitle] = useState("");
    const [events, setEvents] = useState([]);

    useEffect(() => {
        /*만약 정상적인 로그인이 아니라면 == 세션에 데이터가 없다면*/
        if (window.sessionStorage.getItem("observe") == null) {
            /*홈 화면으로 튕겨냄*/
            redirect("/");
        }
    }, []);
    
    /*날짜 데이터가 바뀌면 해당 내용을 서버로 보내 미리 데이터를 받아올 수 있게끔 실행*/
    useEffect(() => {
        // console.log(calendarTitle);
        fetch("/google/")
    }, [calendarTitle]);

    /*캘린더-검색창 전환을 위한 기능*/
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
        <div className={"main"}>
            <MyContext.Provider value={{isSearchVisible, handleToggle}}>
                <div className={"frame"}>
                    <Header
                        onPrevButtonClick={handlePrevButtonClick}
                        onNextButtonClick={handleNextButtonClick}
                        today={gotoday}
                        currentTitle={calendarTitle}
                    />
                    <div className={"leftOUT"}>
                        <LeftBar onSave={handleSaveEvent}/>
                        {isSearchVisible ? <Search/> :
                            <Center setMainCalendar={setCalendar} setTitle={setTitle} events={events}/>}
                    </div>
                </div>
            </MyContext.Provider>
        </div>
    );
}
