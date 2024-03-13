// Main.js
import React, {useEffect, useRef, useState} from "react";
import Header from "./Header";
import LeftBar from "./LeftBar";
import Search from "./Outlet/Search";
import Center from "./Outlet/Center";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const MyContext = React.createContext();

export default function Main() {
    const redirect = useNavigate();
    const [calendar, setCalendar] = useState(null);
    const [calendarTitle, setCalendarTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryLoading, setCategoryLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [userName, setUserName] = useState('')
    const noteRef = useRef();
    const [noteInfo, setNoteInfo] = useState({
        id: "",
        categoryId: "",
        type: "",
        startTime: "",
        endTime: "",
        etag: "",
        title: "",
        contents: "",
        status: "",
        haveRepost: "",
    })

    useEffect(() => {
        /*만약 정상적인 로그인이 아니라면 == 세션에 데이터가 없다면*/
        if (window.sessionStorage.getItem("observe") == null) {
            /*홈 화면으로 튕겨냄*/
            redirect("/");
        } else {
            getUserName();
        }
        const interval = setInterval(() => {
            if (window.sessionStorage.getItem("token") != null) {
                checkToken();
            }
        }, 10000);
        dateSetting();
        categoryListData();
    }, []);

    /*날짜 데이터가 바뀌면 해당 내용을 서버로 보내 미리 데이터를 받아올 수 있게끔 실행*/
    useEffect(() => {
        // console.log(calendarTitle);
        updateMonthly(calendarTitle);
        noteListDate(calendarTitle);
    }, [calendarTitle]);

    const getUserName = async () => {
        const userName = await axios.post("/user", window.sessionStorage.getItem("observe"));
        setUserName(userName.data);
    }

    async function updateMonthly(calendarTitle) {
        if (calendarTitle !== "") {
            let token = JSON.parse(window.sessionStorage.getItem("token"));
            if (!token) {
                await fetch("/google/reqAccessToken", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Accept": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify({
                        observe: window.sessionStorage.getItem("observe"),
                    }),
                }).then(response => response.json())
                    .then((result) => {
                        window.sessionStorage.setItem("token", JSON.stringify({
                            access: result.access,
                            expire: new Date().getTime() + (1000 * 60 * 10),
                        }));
                        fetch("/google/updateMonthly", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json; charset=utf-8",
                                "Accept": "application/json; charset=utf-8",
                            },
                            body: JSON.stringify({
                                observe: window.sessionStorage.getItem("observe"),
                                token: result.access,
                                date: calendarTitle,
                            }),
                        });
                    })
            } else {
                axios("/google/updateMonthly", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Accept": "application/json; charset=utf-8",
                    },
                    data: JSON.stringify({
                        observe: window.sessionStorage.getItem("observe"),
                        token: token.access,
                        date: calendarTitle,
                    }),
                });
            }
        }
    }

    function dateSetting() {
        // 초기 렌더링 시점에 값을 설정하는 로직 추가
        const today = new Date();
        const options = {year: "numeric", month: "long"};
        const formattedDate = today.toLocaleDateString("ko-KR", options);
        setCalendarTitle(formattedDate);
    }

    function checkToken() {
        const token = JSON.parse(window.sessionStorage.getItem("token"))
        if (new Date().getTime() >= token.expire) {
            // console.log("토큰삭제");
            window.sessionStorage.removeItem("token");
        }
    }

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

    const categoryListData = async () => {
        setCategoryLoading(true)
        const response = await axios.post("/categories", window.sessionStorage.getItem("observe"));
        // console.log(response)
        const categoriesGet = Object.entries(response.data);
        const indexDB = window.indexedDB.open("e6eo");
        indexDB.onerror = (event) => {
            console.error("데이터베이스 열기 실패:", event.target.error);
        };
        indexDB.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore("categories_checked", {keyPath: "categoryId"});
        };
        indexDB.onsuccess = (event) => {
            // console.log("데이터베이스 열기 성공")
            const db = event.target.result;
            const transaction = db.transaction("categories_checked", "readwrite");
            const objectStore = transaction.objectStore("categories_checked");
            const categoryList = categoriesGet.map((category) => {
                return new Promise((resolve) => {
                    const categoryData = objectStore.get(category[0]);
                    categoryData.onsuccess = (event) => {
                        const data = event.target.result;
                        if (data === undefined) {
                            // 기본값 설정
                            objectStore.put({categoryId: category[0], value: true});
                            // console.log([category[0], category[1], true]);
                            resolve([category[0], category[1], true]);
                        } else {
                            resolve([category[0], category[1], data.value]);
                        }
                    };
                });
                // console.log("체크 안쪽", categoryList)
            })
            Promise.all(categoryList).then((results) => {
                setCategories(results);
                setCategoryLoading(false);
                // console.log("데이터 체크 :", results);
            })
        }
    }

    const noteListDate = async (calendarTitle) => {
        if (calendarTitle !== '') {
            await axios.post("/notes",
                {
                    observe: sessionStorage.getItem("observe"),
                    date: calendarTitle,
                }
            ).then((response) => {
                // console.log(response.data);
                // console.log(data, typeof data);
                const fullEvents = response.data.map((note) => {
                    if (note.type === "task" || note.type === "note") {
                        return {
                            id: note.id,
                            title: note.title,
                            start: note.startTime,
                            end: note.endTime,
                            allDay: true,
                            type: note.type,
                            data: note,
                        }
                    } else {
                        return {
                            id: note.id,
                            title: note.title,
                            start: note.startTime,
                            end: note.endTime,
                            type: note.type,
                            data: note,
                        }
                    }
                })
                setEvents(fullEvents);
            })
        }
    }

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
                    <div className={"container"}>
                        <LeftBar categories={categories} categoryLoading={categoryLoading} userName={userName}/>
                        {isSearchVisible ? <Search/> :
                            <Center setMainCalendar={setCalendar} setTitle={setTitle} events={events}
                                    setEvents={setEvents} onSave={handleSaveEvent}
                                    noteRef={noteRef} setNoteInfo={setNoteInfo} categories={categories}/>}
                    </div>
                </div>
            </MyContext.Provider>
        </div>
    );
}
