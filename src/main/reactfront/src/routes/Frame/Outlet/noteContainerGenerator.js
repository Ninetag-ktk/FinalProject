import {useEffect, useRef, useState} from 'react';

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
        function noteTypeIcon() {
            switch (noteRef.type) {
                case "event": {
                    return (
                        <svg className={"svgIcon"} xmlns="http://www.w3.org/2000/svg" viewBox="60 60 400 400"
                             id="calendar">
                            <path
                                d="M368.005 272h-96v96h96v-96zm-32-208v32h-160V64h-48v32h-24.01c-22.002 0-40 17.998-40 40v272c0 22.002 17.998 40 40 40h304.01c22.002 0 40-17.998 40-40V136c0-22.002-17.998-40-40-40h-24V64h-48zm72 344h-304.01V196h304.01v212z"/>
                        </svg>
                    )
                    break;
                }
                case "task": {
                    return (
                        <svg className={"svgIcon"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                             id="time">
                            <path
                                d="M12.004.998C5.94.998.996 5.935.996 11.998s4.945 11.006 11.008 11.006c6.063 0 10.998-4.943 10.998-11.006 0-6.063-4.935-11-10.998-11zm0 2a8.983 8.983 0 0 1 8.998 9 8.988 8.988 0 0 1-8.998 9.006 8.997 8.997 0 0 1-9.008-9.006c0-4.982 4.026-9 9.008-9zm-.016 1.986a1 1 0 0 0-.99 1.02v5.994a1 1 0 0 0 .297.707l4 4.002a1 1 0 1 0 1.41-1.418L13 11.584v-5.58a1 1 0 0 0-1.012-1.02z"/>
                        </svg>
                    )
                    break;
                }
                case "memo": {
                    return (
                        <svg className={"svgIcon"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 78" id="notes">
                            <path
                                d="M75.8 11.6a1.985 1.985 0 0 0-2.6 3 7.392 7.392 0 0 1 2.8 5.8v46.4a7.514 7.514 0 0 1-7.4 7.4H11.4A7.514 7.514 0 0 1 4 66.8V20.4a7.514 7.514 0 0 1 7.4-7.4h30a2 2 0 1 0 0-4h-30A11.27 11.27 0 0 0 0 20.4v46.2C.068 72.868 5.132 77.932 11.4 78h57A11.4 11.4 0 0 0 80 66.8V20.4a11.606 11.606 0 0 0-4.2-8.8zM56.2 68a2.3 2.3 0 0 0 1.8 1.2 1.922 1.922 0 0 0 1.8-1.2l6-12.2a1.2 1.2 0 0 0 .2-.8V8a8 8 0 1 0-16 0v47a.965.965 0 0 0 .2.8l6 12.2zm1.8-5.4L55.2 57h5.6L58 62.6zM54 8a4 4 0 1 1 8 0v17.2h-8V8zm0 21.2h8v4h-8v-4zm0 8.2h8V53h-8V37.4zm-14.2-5H12.2a2 2 0 1 0 0 4H40a1.847 1.847 0 0 0 1.8-2 1.89 1.89 0 0 0-2-2zm0 8H12.2a2 2 0 1 0 0 4H40a1.847 1.847 0 0 0 1.8-2 1.89 1.89 0 0 0-2-2zm0 8H12.2a2 2 0 1 0 0 4H40a1.847 1.847 0 0 0 1.8-2 1.89 1.89 0 0 0-2-2z"/>
                        </svg>
                    )
                    break;
                }
                default:
                    return null;
            }
        }

        function noteDate() {
            const startTime = noteRef.startTime;
            const endTime = noteRef.endTime;
            const today = new Date();

            function parseStart() {
                const [date, time] = startTime.split('T');
                const dateObject = new Date(date);
                const [year, month, day] = date.split('-');
                const weekday = dateObject.toLocaleDateString('ko-KR', {
                    weekday: 'long',
                });
                if (time === undefined || time.endsWith('00:00:00.000Z')) {
                    if (year === today.getFullYear().toString()) {
                        return `${month}월 ${day}일 (${weekday})`;
                    } else {
                        return `${year}년 ${month}월 ${day}일 (${weekday})`;
                    }
                } else {
                    const [hours, minutes, seconds] = time.split(':');
                    const hour12 = hours % 12 || 12;
                    const ampm = hours >= 12 ? '오후' : '오전';
                    if (year === today.getFullYear().toString()) {
                        return `${month}월 ${day}일 (${weekday}) ${hours}시${minutes}분`;
                    } else {
                        return `${year}년 ${month}월 ${day}일 (${weekday})`;
                    }
                }
            }

            function parseEnd() {
                const [date, time] = endTime.split('T');
                const dateObject = new Date(date);
                const [year, month, day] = date.split('-');
                const weekday = dateObject.toLocaleDateString('ko-KR', {
                    weekday: 'long',
                });
                if (time === undefined || time.endsWith('00:00:00.000Z')) {
                    if (year === today.getFullYear().toString()) {
                        return `${month}월 ${day}일 (${weekday})`;
                    } else {
                        return `${year}년 ${month}월 ${day}일 (${weekday})`;
                    }
                } else {
                    const [hours, minutes, seconds] = time.split(':');
                    const hour12 = hours % 12 || 12;
                    const ampm = hours >= 12 ? '오후' : '오전';
                    if (year === today.getFullYear().toString()) {
                        return `${month}월 ${day}일 (${weekday}) ${hours}시${minutes}분`;
                    } else {
                        return `${year}년 ${month}월 ${day}일 (${weekday})`;
                    }
                }
            }

            function varCheck() {
                const start = parseStart();
                const end = parseEnd();
                let diffIndex = -1;
                for (let i = 0; i < end.length; i++) {
                    if (start[i] !== end[i]) {
                        diffIndex = i;
                        break;
                    }
                }
                if (diffIndex === -1) {
                    return `${start}`;
                } else {
                    return `${start} - ${end.slice(diffIndex - 1, end.length)}`;
                }
            }

            return varCheck();
        }

        function info() {
            console.log(noteRef)
            return (<div className={"noteContainer"}>
                <div className={"noteHeader"}>
                    <span className={"noteIconContainer"}><span/></span>
                    <span className={"noteTitle"}>{noteRef.title}</span>
                </div>
                <div className={"noteBody"}>
                    <div className={"noteDue noteBody-info-outer"}>
                                <span className={"noteIconContainer"}>
                                    {noteTypeIcon()}
                                </span>
                        <span className={"noteBody-info"}>
                                    {noteDate()}
                                </span>
                    </div>
                    {noteRef.contents !== null &&
                        <div className={"noteContents noteBody-info-outer"}>
                                    <span className={"noteIconContainer"}>
                                        <svg className={"svgIcon"} xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 32 32" id="comment"><g
                                            data-name="Layer 7"><path
                                            d="M25,2H7A6,6,0,0,0,1,8V18a6,6,0,0,0,6,6h8.68l9.74,6.82a1,1,0,0,0,1.56-1l-.85-6A6,6,0,0,0,31,18V8A6,6,0,0,0,25,2Zm4,16a4,4,0,0,1-4,4,1,1,0,0,0-1,1.14l.67,4.72-8.11-5.68A1,1,0,0,0,16,22H7a4,4,0,0,1-4-4V8A4,4,0,0,1,7,4H25a4,4,0,0,1,4,4Z"></path><path
                                            d="M25 7H12a1 1 0 0 0 0 2H25a1 1 0 0 0 0-2zM25 12H7a1 1 0 0 0 0 2H25a1 1 0 0 0 0-2zM25 17H7a1 1 0 0 0 0 2H25a1 1 0 0 0 0-2z"></path></g></svg>
                                    </span>
                            <span className={"noteBody-info"}>
                                        {noteRef.contents}
                                    </span>
                        </div>}
                </div>
                <div>
                    <button>저장</button>
                </div>
            </div>)
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

        return (<div className={"noteContainer"}>
            <div className={"noteHeader"}>
                <input type={"text"} className={"noteTitle"} placeholder={"제목 및 시간 추가"}/>
            </div>
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
        </div>)
    }

    function typeFilter() {
        function eventRadio(bool) {
            return (<div className={"typeContainer"}>
                <div className={"typeSelect"}>
                    <input type={"radio"} name={"noteType"} value={"event"} id={"eventType"}
                           defaultChecked={bool} className={"typeSelect-input"} onChange={typeHandle}/>
                    <label htmlFor={"eventType"} className={"typeSelect-label"}>
                        <svg className={"svgIcon"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                             id="event">
                            <path
                                d="M5 4.5a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 1 0v2a.5.5 0 0 1-.5.5zM11 4.5a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 1 0v2a.5.5 0 0 1-.5.5z"/>
                            <path
                                d="M13 14.5H3c-.827 0-1.5-.673-1.5-1.5V4c0-.827.673-1.5 1.5-1.5h10c.827 0 1.5.673 1.5 1.5v9c0 .827-.673 1.5-1.5 1.5zM3 3.5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H3z"/>
                            <path
                                d="M14 6.5H2a.5.5 0 0 1 0-1h12a.5.5 0 0 1 0 1zM5.5 7.5h1v1h-1zM7.5 7.5h1v1h-1zM9.5 7.5h1v1h-1zM11.5 7.5h1v1h-1zM3.5 9.5h1v1h-1zM5.5 9.5h1v1h-1zM7.5 9.5h1v1h-1zM9.5 9.5h1v1h-1zM11.5 9.5h1v1h-1zM3.5 11.5h1v1h-1zM5.5 11.5h1v1h-1zM7.5 11.5h1v1h-1z"/>
                        </svg>
                        <span>event</span>
                    </label>
                </div>
            </div>)
        }

        function taskRadio(bool) {
            return (<div className={"typeContainer"}>
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
            </div>)
        }

        function memoRadio(bool) {
            return (<div className={"typeContainer"}>
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
            </div>)
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
            return (<div className={"typeContainer"}>
                {eventRadio(false)}
                {taskRadio(false)}
                {memoRadio(true)}
            </div>)
        }
    }

    function interfaceByType() {
        function eventInterface() {
            return (<span>
                    <div>
                        <span className={"noteIconContainer"}>
                        <svg className={"svgIcon"} xmlns="http://www.w3.org/2000/svg" viewBox="60 60 400 400"
                             id="calendar">
                            <path
                                d="M368.005 272h-96v96h96v-96zm-32-208v32h-160V64h-48v32h-24.01c-22.002 0-40 17.998-40 40v272c0 22.002 17.998 40 40 40h304.01c22.002 0 40-17.998 40-40V136c0-22.002-17.998-40-40-40h-24V64h-48zm72 344h-304.01V196h304.01v212z"/>
                        </svg>
                        </span>
                        <input type={"datetime-local"}/> - <input type={"datetime-local"}/>
                    </div>
                    <div>
                        <span className={"noteIconContainer"}>
                                        <svg className={"svgIcon"} xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 32 32" id="comment"><g
                                            data-name="Layer 7"><path
                                            d="M25,2H7A6,6,0,0,0,1,8V18a6,6,0,0,0,6,6h8.68l9.74,6.82a1,1,0,0,0,1.56-1l-.85-6A6,6,0,0,0,31,18V8A6,6,0,0,0,25,2Zm4,16a4,4,0,0,1-4,4,1,1,0,0,0-1,1.14l.67,4.72-8.11-5.68A1,1,0,0,0,16,22H7a4,4,0,0,1-4-4V8A4,4,0,0,1,7,4H25a4,4,0,0,1,4,4Z"></path><path
                                            d="M25 7H12a1 1 0 0 0 0 2H25a1 1 0 0 0 0-2zM25 12H7a1 1 0 0 0 0 2H25a1 1 0 0 0 0-2zM25 17H7a1 1 0 0 0 0 2H25a1 1 0 0 0 0-2z"></path></g></svg>
                                    </span>
                        <input type={"text"}/>
                    </div>
                </span>)
        }

        function taskInterface() {
            return (<span>
                    <div>
                        <span className={"noteIconContainer"}>
                        <svg className={"svgIcon"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                             id="time">
                            <path
                                d="M12.004.998C5.94.998.996 5.935.996 11.998s4.945 11.006 11.008 11.006c6.063 0 10.998-4.943 10.998-11.006 0-6.063-4.935-11-10.998-11zm0 2a8.983 8.983 0 0 1 8.998 9 8.988 8.988 0 0 1-8.998 9.006 8.997 8.997 0 0 1-9.008-9.006c0-4.982 4.026-9 9.008-9zm-.016 1.986a1 1 0 0 0-.99 1.02v5.994a1 1 0 0 0 .297.707l4 4.002a1 1 0 1 0 1.41-1.418L13 11.584v-5.58a1 1 0 0 0-1.012-1.02z"/>
                        </svg>
                        </span>
                        <input type={"datetime-local"}/>
                    </div>
                    <div>
                        <span className={"noteIconContainer"}>
                                        <svg className={"svgIcon"} xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 32 32" id="comment"><g
                                            data-name="Layer 7"><path
                                            d="M25,2H7A6,6,0,0,0,1,8V18a6,6,0,0,0,6,6h8.68l9.74,6.82a1,1,0,0,0,1.56-1l-.85-6A6,6,0,0,0,31,18V8A6,6,0,0,0,25,2Zm4,16a4,4,0,0,1-4,4,1,1,0,0,0-1,1.14l.67,4.72-8.11-5.68A1,1,0,0,0,16,22H7a4,4,0,0,1-4-4V8A4,4,0,0,1,7,4H25a4,4,0,0,1,4,4Z"></path><path
                                            d="M25 7H12a1 1 0 0 0 0 2H25a1 1 0 0 0 0-2zM25 12H7a1 1 0 0 0 0 2H25a1 1 0 0 0 0-2zM25 17H7a1 1 0 0 0 0 2H25a1 1 0 0 0 0-2z"></path></g></svg>
                                    </span>
                        <input type={"text"}/>
                    </div>
                </span>)
        }

        function memoInterface() {
            return (<span>
                    <div>
                        <span className={"noteIconContainer"}>
                                        <svg className={"svgIcon"} xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 32 32" id="comment"><g
                                            data-name="Layer 7"><path
                                            d="M25,2H7A6,6,0,0,0,1,8V18a6,6,0,0,0,6,6h8.68l9.74,6.82a1,1,0,0,0,1.56-1l-.85-6A6,6,0,0,0,31,18V8A6,6,0,0,0,25,2Zm4,16a4,4,0,0,1-4,4,1,1,0,0,0-1,1.14l.67,4.72-8.11-5.68A1,1,0,0,0,16,22H7a4,4,0,0,1-4-4V8A4,4,0,0,1,7,4H25a4,4,0,0,1,4,4Z"></path><path
                                            d="M25 7H12a1 1 0 0 0 0 2H25a1 1 0 0 0 0-2zM25 12H7a1 1 0 0 0 0 2H25a1 1 0 0 0 0-2zM25 17H7a1 1 0 0 0 0 2H25a1 1 0 0 0 0-2z"></path></g></svg>
                                    </span>
                        <input type={"text"}/>
                    </div>
                </span>)
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
            default:
                return null;
        }
    }

    return (<span className={"noteContainerOuter"}>
            {noteRef !== null ? noteInfo() : noteInsert()}
        </span>)
}