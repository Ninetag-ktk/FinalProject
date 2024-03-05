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
                <h2>캘린더 리스트</h2>
                <ul>
                    <li>경조사</li>
                    <li>출장</li>
                    <li>예비군</li>
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

        </div>
    )
}

