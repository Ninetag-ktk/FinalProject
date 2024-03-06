// Center.js
import React, {useEffect, useRef, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Center = ({setMainCalendar, setTitle, events, setEvents}) => {
    const calendarRef = useRef(null);
    const [calendar, setCalendar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        setIsModalOpen(true);
    };

    const handleAddEvent = (event) => {
        setEvents([...events, event]);
        setIsModalOpen(false);
    };

    return (
        <div>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin]}
                headerToolbar={false}
                dayMaxEvents={true}
                locale={'ko'}
                events={events}
                eventClick={handleEventClick}
            />
        </div>
    );
};


export default Center;
