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

        setModalContent(
            <div>
                <p>제목: {info.event.title}</p>
                <p>시작일: {info.event.start.toString()}</p>
                <p>종료일: {info.event.end.toString()}</p>
            </div>
        );
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <FullCalendar

                ref={calendarRef}
                plugins={[interactionPlugin, dayGridPlugin]}
                headerToolbar={false}
                dayMaxEvents={true}
                locale={'ko'}
                events={events}
                eventClick={(info) => handleEventClick(info)} // 클릭 이벤트 핸들러 수정
                selectable={true}
            />

            {showModal && (
                <div className="event-click" >

                        {modalContent}
                        <button onClick={closeModal}>Close</button>

                </div>
            )}
        </div>
    );
};

export default Center;
