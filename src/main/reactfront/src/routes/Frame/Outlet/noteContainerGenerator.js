import {useEffect, useState, useRef} from "react";

export default function ({noteRef, categories}) {
    const [noteCategory, setNoteCategory] = useState('');
    const [noteType, setNoteType] = useState('memo');
    const infoMode = useRef(true);
    useEffect(() => {
        typeFilter()
    }, [noteCategory])
    useEffect(() => {
        interfaceByType();
    }, [noteType])

    const typeHandle = (e) => {
        setNoteType(e.target.value);
    };

    function noteInfo() {

        function info() {
            console.log(noteRef)
            return (
                <div className={"noteContainer"}>
                    <div className={"noteInfo"}>
                        <div className={"noteInfoHeader"}>
                            <div className={"noteTitle"}></div>
                            <div className={"noteTypeContainer"}>
                                {noteRef.id};
                            </div>
                        </div>
                    </div>
                    내용
                    <div>
                        <button>저장</button>
                    </div>
                </div>
            )
        }

        if (infoMode.current) {
            return info()
        } else {
            return null;
        }
    }

    function noteInsert() {
        const options = categories.map((category) => {
            return <option value={category[0]}>{category[1]}</option>
        })

        return (
            <div className={"noteContainer"}>
                <h1>insert</h1>
                <div className={"eventTitle"}><input type={"text"}/></div>
                <div className={"selectContainer"}>
                    <select className={"categorySelect"} onChange={(e) => {
                        setNoteCategory(e.target.value)
                    }}>{options}</select>
                    {typeFilter()}
                </div>
                <div className={"eventBody"}>
                    {interfaceByType()}
                </div>
                <div>
                    <button>저장</button>
                </div>
            </div>
        )
    }

    function typeFilter() {
        function eventRadio(bool) {
            return (
                <div className={"typeContainer"}>
                    <div className={"typeSelect"}>
                        <input type={"radio"} name={"noteType"} value={"event"} id={"eventType"}
                               defaultChecked={bool} className={"typeSelect-input"} onChange={typeHandle}/>
                        <label htmlFor={"eventType"} className={"typeSelect-label"}>
                            <svg className={"svgIcon"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                                 id="event">
                                <path
                                    d="M5 4.5a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 1 0v2a.5.5 0 0 1-.5.5zM11 4.5a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 1 0v2a.5.5 0 0 1-.5.5z"></path>
                                <path
                                    d="M13 14.5H3c-.827 0-1.5-.673-1.5-1.5V4c0-.827.673-1.5 1.5-1.5h10c.827 0 1.5.673 1.5 1.5v9c0 .827-.673 1.5-1.5 1.5zM3 3.5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H3z"></path>
                                <path
                                    d="M14 6.5H2a.5.5 0 0 1 0-1h12a.5.5 0 0 1 0 1zM5.5 7.5h1v1h-1zM7.5 7.5h1v1h-1zM9.5 7.5h1v1h-1zM11.5 7.5h1v1h-1zM3.5 9.5h1v1h-1zM5.5 9.5h1v1h-1zM7.5 9.5h1v1h-1zM9.5 9.5h1v1h-1zM11.5 9.5h1v1h-1zM3.5 11.5h1v1h-1zM5.5 11.5h1v1h-1zM7.5 11.5h1v1h-1z"></path>
                            </svg>
                            <span>event</span>
                        </label>
                    </div>
                </div>
            )
        }

        function taskRadio(bool) {
            return (
                <div className={"typeContainer"}>
                    <div className={"typeSelect"}>
                        <input type={"radio"} name={"noteType"} value={"task"} id={"taskType"}
                               defaultChecked={bool} className={"typeSelect-input"} onChange={typeHandle}/>
                        <label htmlFor={"taskType"} className={"typeSelect-label"}>
                            <svg className={"svgIcon"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="task">
                                <path
                                    d="M20.4,12.349a.5.5,0,0,1-.5.5H11.288a.5.5,0,0,1,0-1H19.9A.5.5,0,0,1,20.4,12.349ZM11.288,6.8H19.9a.5.5,0,0,0,0-1H11.288a.5.5,0,0,0,0,1ZM19.9,17.9H11.288a.5.5,0,0,0,0,1H19.9a.5.5,0,0,0,0-1ZM6.85,10.1a2.25,2.25,0,1,0,2.25,2.25A2.253,2.253,0,0,0,6.85,10.1Zm1.54-5.57L6.34,6.949l-.84-1.1a.5.5,0,0,0-.7-.1.507.507,0,0,0-.1.7l1.22,1.6a.517.517,0,0,0,.39.2h.01a.527.527,0,0,0,.38-.18l2.45-2.9a.5.5,0,0,0-.76-.64ZM6.85,16.149A2.25,2.25,0,1,0,9.1,18.4,2.253,2.253,0,0,0,6.85,16.149Z"></path>
                            </svg>
                            <span>task</span>
                        </label>
                    </div>
                </div>
            )
        }

        function memoRadio(bool) {
            return (
                <div className={"typeContainer"}>
                    <div className={"typeSelect"}>
                        <input type={"radio"} name={"noteType"} value={"memo"} id={"memoType"}
                               defaultChecked={bool} className={"typeSelect-input"} onChange={typeHandle}/>
                        <label htmlFor={"memoType"} className={"typeSelect-label"}>
                            <svg className={"svgIcon"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="memo">
                                <g data-name="2">
                                    <path
                                        d="M25.75,10a.6.6,0,0,0-.07-.3s0,0,0-.07a.79.79,0,0,0-.14-.18v0l-7-6-.12-.07-.09-.06A.87.87,0,0,0,18,3.26H7A.75.75,0,0,0,6.25,4V28a.75.75,0,0,0,.75.75H25a.76.76,0,0,0,.75-.75V10Zm-7-4.38L23,9.27H18.75Zm-11,21.6V4.76h9.5V10a.77.77,0,0,0,.22.53.75.75,0,0,0,.53.22h6.25V27.24Z"></path>
                                    <path
                                        d="M10.06 9.83h3.83a.75.75 0 0 0 0-1.5H10.06a.75.75 0 0 0 0 1.5zM21.94 12.31H10.06a.75.75 0 0 0 0 1.5H21.94a.75.75 0 0 0 0-1.5zM21.94 16.26H10.06a.75.75 0 1 0 0 1.5H21.94a.75.75 0 0 0 0-1.5zM21.94 20.23H10.06a.75.75 0 1 0 0 1.5H21.94a.75.75 0 0 0 0-1.5zM21.94 24H10.06a.75.75 0 1 0 0 1.5H21.94a.75.75 0 0 0 0-1.5z"></path>
                                </g>
                            </svg>
                            <span>memo</span>
                        </label>
                    </div>
                </div>
            )
        }

        if (noteCategory.startsWith("google")) {
            // console.log(noteCategory)
            const noteCategoryType = noteCategory.split("^");
            // console.log(noteCategoryType[1])
            switch (noteCategoryType[1]) {
                case "calendar": {
                    return eventRadio(true);
                    break;
                }
                case "tasks": {
                    return taskRadio(true);
                    break;
                }
                default: {
                    return null;
                    break;
                }
            }
        } else {
            return (
                <div className={"typeContainer"}>
                    {eventRadio(false)}
                    {taskRadio(false)}
                    {memoRadio(true)}
                </div>
            )
        }
    }

    function interfaceByType() {
        function eventInterface() {
            return (
                <span>
                    <div>
                        시작일
                        <input type={"datetime-local"}/>
                    </div>
                    <div>
                        종료일
                        <input type={"datetime-local"}/>
                    </div>
                    <div>
                        내용
                        <input type={"text"}/>
                    </div>
                </span>
            )
        }

        function taskInterface() {
            return (
                <span>
                    <div>
                        마감일
                        <input type={"datetime-local"}/>
                    </div>
                    <div>
                        내용
                        <input type={"text"}/>
                    </div>
                </span>
            )
        }

        function memoInterface() {
            return (
                <span>
                    <div>
                        내용
                        <input type={"text"}/>
                    </div>
                </span>
            )
        }
        switch (noteType) {
            case "event": {
                return eventInterface();
                break;
            }
            case "task": {
                return taskInterface();
                break;
            }
            case "memo": {
                return memoInterface();
                break;
            }
            default: return null;
        }
    }

        return (
            <span>
            {noteRef !== null ? noteInfo() : noteInsert()}
        </span>
        )
    }