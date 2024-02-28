import React from "react";

export default function  LeftBar  () {
    return(
        <div className="leftbar">
            <div className="category-create">
                <button>카테고리 추가</button>
            </div>

            <div className="today-tasks">
                <h2>오늘 할 일</h2>
                <ul>
                    <li>할 일 1</li>
                    <li>할 일 2</li>
                    <li>할 일 3</li>
                </ul>
            </div>

            <div className="schedule">
                <h2>일정</h2>
                <ul>
                    <li>2024년 2월 27일 - 회의</li>
                    <li>2024년 2월 28일 - 팀 미팅</li>
                    <li>2024년 3월 1일 - 프로젝트 발표</li>
                </ul>
            </div>
        </div>
    )
}

