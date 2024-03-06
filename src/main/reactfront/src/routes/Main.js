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

    /*처음 페이지가 로드될 때 실행 == onLoad 이벤트*/
    const stateCheck = () => {
        /*만약 정상적인 로그인이 아니라면 == 세션에 데이터가 없다면*/
        if (window.sessionStorage.getItem("observe") == null) {
            /*홈 화면으로 튕겨냄*/
            redirect("/");
        }
        if (window.sessionStorage.getItem("check") !== null) {
            /*서버로 옵저브 토큰을 보내, 데이터 업데이트*/
            fetch("/google/updateCheck", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Accept": "application/json; charset=utf-8",
                },
                body: JSON.stringify(window.sessionStorage.getItem("observe")),
            });
            window.sessionStorage.removeItem("check");
        }
    }

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [calendar, setCalendar] = useState(null);
    const [calendarTitle, setCalendarTitle] = useState("");
    const [events, setEvents] = useState([]);

    useEffect(() => {
        console.log(calendarTitle);
    }, [calendarTitle])

    let observe = {observe: sessionStorage.getItem("observe")}

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
        <div className={"Main"}>
            <MyContext.Provider value={{isSearchVisible, handleToggle}}>
                <div className={"frame"} onLoad={stateCheck}>
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
