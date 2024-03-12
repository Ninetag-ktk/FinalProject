import React, {useEffect, useRef, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';

const Center = ({setMainCalendar, events, setEvents, onSave}) => {
    const calendarRef = useRef(null);
    const [calendar, setCalendar] = useState(null);
    const [title, setTitle] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showM, setShowM] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const initializeCalendar = () => {
            const newCalendar = calendarRef.current.getApi();
            setCalendar(newCalendar);
            setMainCalendar(newCalendar);
            setTitle(newCalendar.view.title);
        };
        initializeCalendar();
    }, [setMainCalendar, setTitle]);

    const handleEventClick = (info) => {
        setSelectedDate(info.event.startStr);
        setTitle(info.event.title);
        setStartDate(info.event.start);
        setEndDate(info.event.end);
        setShowM(true);
    };

    const handleDateSelect = (selectInfo) => {
        setSelectedDate(selectInfo.startStr);
        setStartDate(`${selectInfo.startStr}T06:00`); // 선택한 날짜의 06:00으로 시작 시간 설정
        setEndDate(`${selectInfo.startStr}T22:00`);
        setShowModal(true);
    };

    const handleSave = () => {
        const newEvent = {
            title: title,
            start: startDate,
            end: endDate
        };
        setEvents([...events, newEvent]);
        onSave(newEvent);
        setShowModal(false);

    };

    const closeModal = () => {
        setShowModal(false);

    };

    const closeM = () => {
        setShowM(false);
    };

    const handleInputChange = (e) => {
        setTitle(e.target.value);
    };

    return (
        <div className="center">
            <FullCalendar
                ref={calendarRef}
                plugins={[interactionPlugin, dayGridPlugin]}
                headerToolbar={false}
                dayMaxEvents={true}
                locale={'ko'}
                events={events}
                selectable={true}
                select={handleDateSelect}
                eventClick={handleEventClick}
            />

            {showModal && (
                <div>
                    {selectedDate ? (
                        <div className="event-click">
                            <p>날짜: {selectedDate}</p>
                            <label>
                                제목:
                                <input type="text" value={title} onChange={handleInputChange}/>
                            </label>
                            <label>
                                시작 일시:
                                <input type="datetime-local" value={startDate}
                                       onChange={(e) => setStartDate(e.target.value)}/>
                            </label>
                            <label>
                                종료 일시:
                                <input type="datetime-local" value={endDate}
                                       onChange={(e) => setEndDate(e.target.value)}/>
                            </label>
                            <button onClick={handleSave}>저장</button>
                            <button onClick={closeModal}>닫기</button>
                        </div>
                    ) : null}
                </div>
            )}

            {showM && (
                <div>
                    {selectedDate ? (
                        <div className="event-click">
                            <p>선택된 이벤트 제목: {title}</p>
                            <p>시작 시간: {new Date(startDate).toLocaleString('ko-KR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                            })}</p>
                            <p>종료 시간: {new Date(endDate).toLocaleString('ko-KR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                            })}</p>
                            <button onClick={closeM}>Close</button>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default Center;
