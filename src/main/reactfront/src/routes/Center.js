// Center.js
import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Center = ({ setMainCalendar }) => {
    const calendarRef = useRef(null);
    const [calendar, setCalendar] = useState(null);

    useEffect(() => {
        const initializeCalendar = () => {
            const newCalendar = calendarRef.current.getApi();
            setCalendar(newCalendar);
            setMainCalendar(newCalendar);
        };

        initializeCalendar();
    }, []);


    return (
        <div>

            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin]}
                headerToolbar={false}
            />
        </div>
    );
};

export default Center;
