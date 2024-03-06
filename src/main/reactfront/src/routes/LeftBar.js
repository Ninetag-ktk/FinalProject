import React, {useState} from "react";

export default function LeftBar() {

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
            <div className="category-create">
                <input/>
                <button>(캘린더)카테고리 추가</button>
            </div>


            <div className="schedule">
                <h2>캘린더 리스트</h2>
                <ul>
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

