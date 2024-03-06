// Center.js
import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Center = ({ setMainCalendar, setTitle }) => {
    const calendarRef = useRef(null);
    const [calendar, setCalendar] = useState(null);



    useEffect(() => {
        const initializeCalendar = () => {
            const newCalendar = calendarRef.current.getApi();
            setCalendar(newCalendar);
            setMainCalendar(newCalendar);
            setTitle(newCalendar.view.title);
        };

        initializeCalendar();
    }, [setMainCalendar, setTitle]); // setTitle도 의존성 배열에 추가



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
