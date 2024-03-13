import React, {useEffect, useRef, useState, useCallback} from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import NoteDOM from './noteContainerGenerator';

const Center = ({setMainCalendar, events, setEvents, onSave, noteRef, categories}) => {
    const calendarRef = useRef(null);
    const [calendar, setCalendar] = useState(null);
    const [title, setTitle] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
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

    const handleEventClick = (e) => {
        // setSelectEvent 해서 데이터를 저장
        noteRef.current = e.event.extendedProps.data;
        setShowModal(true);
    };

    const handleEventInsert = (e) => {
        noteRef.current = null
        setSelectedDate(`${e.startStr}T00:00`); // 선택한 날짜의 06:00으로 시작 시간 설정
        setShowModal(true);
    };
    // 인터페이스 기능은
    // selectEvent에 데이터가 있는지 확인해서
    // 데이터가 있으면 정보창, 없으면 입력창

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
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        setTitle(e.target.value);
    };

    const renderEvent = (event) => {
        const divElement = event.el;
        divElement.dataset.note = JSON.stringify(event.event.extendedProps.data);
        return divElement;
    }

    return (
        <div className="center">
            <FullCalendar
                ref={calendarRef}
                plugins={[interactionPlugin, dayGridPlugin]}
                headerToolbar={false}
                dayMaxEvents={true}
                locale={'ko'}
                events={events}
                eventDidMount={renderEvent}
                selectable={true}
                select={handleEventInsert}
                eventClick={handleEventClick}
            />

            {showModal && (
                <div className={"modal-background"}>
                    <NoteDOM noteRef={noteRef.current} categories={categories}/>
                </div>
            )}
        </div>
    );
};

export default Center;
