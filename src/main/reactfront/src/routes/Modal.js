// Modal.js
import React, { useState } from 'react';

const Modal = ({ onClose, onAddEvent }) => {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const handleSave = () => {
        const newEvent = {
            title: title,
            start: new Date(start),
            end: new Date(end)
        };
        onAddEvent(newEvent); // 입력한 일정을 Center 컴포넌트로 전달
        onClose(); // 모달 닫기
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Add Event</h2>
                <form>
                    <label>
                        Title:
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <label>
                        Start Date:
                        <input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />
                    </label>
                    <label>
                        End Date:
                        <input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} />
                    </label>
                    <button type="button" onClick={handleSave}>Add Event</button>
                    <button type="button" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
