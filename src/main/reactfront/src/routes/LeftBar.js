import React, {useState} from "react";
import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';


export default function LeftBar({ onSave }) {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // 예시로 이벤트를 임의로 생성합니다.
        const exampleEvents = [
        ];
        setEvents(exampleEvents);
    }, []);
    const openModal = () => {
        const dialog = document.getElementById('modal-dialog');
        dialog.showModal();
    };

    const handleSave = () => {
        const newEvent = {
            title: title,
            start: startDate,
            end: endDate
        };
        setEvents([...events, newEvent]);
        onSave(newEvent);
        document.getElementById('modal-dialog').close();

    };

    const [userMenuVisible, setUserMenuVisible] = useState(false);
    const userMenu = document.querySelector(".userMenu");
    const handlerUserMenu = () => {
        setUserMenuVisible(!userMenuVisible);
        if (userMenuVisible) {
            userMenu.style.setProperty("--userBar-height", "3.3rem");
        } else {
            userMenu.style.setProperty("--userBar-height", "0rem");
        }
    };

    return (
        <div className="leftbar">
            <div className={"addevent"}>
                <button onClick={openModal}>일정추가</button>
            </div>


            <div className="schedule">
                <h2>캘린더 리스트</h2>
                <ul>
                    <div className="category-create">
                        <input/>
                        <button>(캘린더)카테고리 추가</button>
                    </div>
                    <li>경조사</li>
                    <li>출장</li>
                    <li>예비군</li>
                </ul>
            </div>
            <div className="today-tasks">
                <h2>오늘 할 일</h2>
                <FullCalendar
                    plugins={[listPlugin]}
                    initialView="listDay"
                    events={events}
                    headerToolbar={false}

                />
            </div>



            <div className={"userbar"}>
                <div className={"userProfile"} onClick={handlerUserMenu}>
                    <div className={"nickName"}>유저 이름</div>
                    <div className={"userButton"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 40 40"
                             fill="currentColor">
                            <circle cx="5" cy="20" r="3"/>
                            <circle cx="20" cy="20" r="3"/>
                            <circle cx="35" cy="20" r="3"/>
                        </svg>
                    </div>
                </div>
                <div className="userMenu">
                    <a href={"/info"} className={"btnFloat"}>내 정보</a>
                    <a className={"btnFloat"}>로그아웃</a>
                </div>
            </div>
        </div>
    )
}

