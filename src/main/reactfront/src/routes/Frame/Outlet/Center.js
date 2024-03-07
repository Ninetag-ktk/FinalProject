import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';

const Center = ({ setMainCalendar, setTitle, events, setEvents }) => {
    const calendarRef = useRef(null);
    const [calendar, setCalendar] = useState(null);
    const [modalContent, setModalContent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const initializeCalendar = () => {
            const newCalendar = calendarRef.current.getApi();
            setCalendar(newCalendar);
            setMainCalendar(newCalendar);
            setTitle(newCalendar.view.title);
        };

        initializeCalendar();
    }, [setMainCalendar, setTitle]);

    // const handleEventClick = (info) => {
    //
    //     setModalContent(
    //         <div>
    //             <p>제목: {info.event.title}</p>
    //             <p>시작일: {info.event.start.toString()}</p>
    //             <p>종료일: {info.event.end.toString()}</p>
    //         </div>
    //     );
    //     setShowModal(true);
    // };



    const handleDateSelect = (selectInfo) => {
        setSelectedDate(selectInfo.startStr);
        setShowModal(true);
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        const newEvent = {
            title: inputValue,
            start: selectedDate,
            allDay: true // 하루 종일 이벤트로 설정
        };

        setEvents([...events, newEvent]);
        setShowModal(false);
        setInputValue('');
    };

    const closeModal = () => {
        setShowModal(false);
        setInputValue('');
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
                select={(selectInfo) => handleDateSelect(selectInfo)}
            />

            {showModal && (
                <div className="event-click">
                    <p>날짜: {selectedDate}</p>
                    <input type="text" value={inputValue} onChange={handleInputChange} />
                    <button onClick={handleSubmit}>이벤트 생성</button>
                    <button onClick={closeModal}>Close</button>
                </div>
            )}
        </div>
    );
};


export default Center;
