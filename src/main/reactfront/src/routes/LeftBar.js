// LeftBar.js
import React, { useState } from "react";


export default function LeftBar({ onSave }) {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const openModal = () => {
        const dialog = document.getElementById('modal-dialog');
        dialog.showModal();
    };

    const handleSave = () => {
        const event = {
            title: title,
            start: startDate,
            end: endDate
        };
        onSave(event);
        document.getElementById('modal-dialog').close();
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
                <ul>
                    <li>할 일 1</li>
                    <li>할 일 2</li>
                    <li>할 일 3</li>
                </ul>
            </div>


            <div className={"profile"}>
                <a href={"/info"}>
                    <button>내 정보</button>
                </a>
            </div>
            <div className={"logout"}>
                <button>로그아웃</button>
            </div>
            <dialog id="modal-dialog">
                <h2>일정 추가</h2>
                <label>
                    제목:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </label>
                <label>
                    시작 일시:
                    <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                </label>
                <label>
                    종료 일시:
                    <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                </label>
                <button onClick={handleSave}>저장</button>
                <button onClick={() => document.getElementById('modal-dialog').close()}>닫기</button>
            </dialog>
        </div>
    )
}

