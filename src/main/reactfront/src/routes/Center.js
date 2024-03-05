// import React, { useState, useEffect } from "react";
//
// export default function Center({ currentMonth, currentYear, onPrevMonthClick, onNextMonthClick }) {
//   const [firstDay, setFirstDay] = useState(null);
//   const [lastDay, setLastDay] = useState(null);
//   const [year, setYear] = useState(0);
//
//   useEffect(() => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = currentMonth; // 현재 월 가져오기
//
//     const firstDayOfMonth = new Date(year, month, 1); // 월의 첫째 날
//     const lastDayOfMonth = new Date(year, month + 1, 0); // 월의 마지막 날
//
//     setFirstDay(firstDayOfMonth);
//     setLastDay(lastDayOfMonth);
//     setYear(year);
//   }, [currentMonth]);
//
//   useEffect(() => {
//     const monthName = [
//       "1월",
//       "2월",
//       "3월",
//       "4월",
//       "5월",
//       "6월",
//       "7월",
//       "8월",
//       "9월",
//       "10월",
//       "11월",
//       "12월"
//     ][currentMonth];
//     document.getElementById("currentMonth").innerHTML = `${currentYear}.${monthName} `;
//   }, [currentMonth, currentYear]);
//
//   const handlePrevBtnClick = () => {
//     const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
//     const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
//
//     onPrevMonthClick(newMonth, newYear);
//   };
//
//   const handleNextBtnClick = () => {
//     const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
//     const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
//
//     onNextMonthClick(newMonth, newYear);
//   };
//
//   const renderDays = () => {
//     const days = [];
//     let week = [];
//
//     if (!firstDay) return days;
//
//     days.push(
//       <div key="first-row" className="divTableRow">
//         {[...Array(firstDay.getDay())].map((_, index) => (
//           <div key={`empty-${index}`} className="divTableCell">
//             &nbsp;
//           </div>
//         ))}
//         {[...Array(7 - firstDay.getDay())].map((_, index) => (
//           <div
//             key={`day-${firstDay.getDate() + index}`}
//             className="divTableCell"
//           >
//             {firstDay.getDate() + index}
//           </div>
//         ))}
//       </div>
//     );
//
//     let currentDate = new Date(year, currentMonth, 1 + (7 - firstDay.getDay()));
//     while (currentDate.getMonth() === currentMonth) {
//       week = [];
//       for (let i = 0; i < 7; i++) {
//         if (currentDate.getMonth() !== currentMonth) {
//           // 현재 월이 아닌 경우에는 빈 칸을 추가
//           week.push(
//               <div key={`empty-${currentDate.getDate()}`} className="divTableCell">
//                 &nbsp;
//               </div>
//           );
//         } else {
//           week.push(
//               <div key={`day-${currentDate.getDate()}`} className="divTableCell">
//                 {currentDate.getDate()}
//               </div>
//           );
//         }
//         currentDate.setDate(currentDate.getDate() + 1);
//       }
//       days.push(<div key={`week-${currentDate.getDate()}`} className="divTableRow">{week}</div>);
//     }
//
//     return days;
//   };
//
//   return (
//     <div className={"divTable"}>
//       <div className="divTableBody">
//         <div className="divTableRow">
//           <div className="divTableCell">일</div>
//           <div className="divTableCell">월</div>
//           <div className="divTableCell">화</div>
//           <div className="divTableCell">수</div>
//           <div className="divTableCell">목</div>
//           <div className="divTableCell">금</div>
//           <div className="divTableCell">토</div>
//         </div>
//         {renderDays()}
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import interactionPlugin from '@fullcalendar/interaction';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';

function Center() {
  const [modalShow, setModalShow] = useState(false);
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleAddEvent = () => {
    if (content === '') {
      alert('내용을 입력하세요.');
    } else if (startDate === '' || endDate === '') {
      alert('날짜를 입력하세요.');
    } else if (new Date(endDate) - new Date(startDate) < 0) {
      alert('종료일이 시작일보다 먼저입니다.');
    } else {
      const newEvent = {
        title: content,
        start: startDate,
        end: endDate
      };
      console.log(newEvent); // 서버로 이 객체를 보내서 데이터베이스와 통합할 수 있습니다.
    }
  };

  return (
      <div>
        <div className="container" >
          <FullCalendar
              plugins={[dayGridPlugin, bootstrapPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              timeZone="UTC"
              headerToolbar={{
                center: 'addEventButton'
              }}
              editable={true}
              displayEventTime={false}
              events={[
                {
                  title: '일정',
                  start: '2021-05-26T00:00:00',
                  end: '2021-05-27T24:00:00'
                }
              ]}
              customButtons={{
                addEventButton: {
                  text: '일정 추가',
                  click: () => setModalShow(true)
                }
              }}
          />
        </div>
        <div
            className="modal fade"
            id="calendarModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{ display: modalShow ? 'block' : 'none' }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  일정을 입력하세요.
                </h5>
                <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setModalShow(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="taskId" className="col-form-label">
                    일정 내용
                  </label>
                  <input
                      type="text"
                      className="form-control"
                      id="calendar_content"
                      name="calendar_content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                  />
                  <label htmlFor="taskId" className="col-form-label">
                    시작 날짜
                  </label>
                  <input
                      type="date"
                      className="form-control"
                      id="calendar_start_date"
                      name="calendar_start_date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                  />
                  <label htmlFor="taskId" className="col-form-label">
                    종료 날짜
                  </label>
                  <input
                      type="date"
                      className="form-control"
                      id="calendar_end_date"
                      name="calendar_end_date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-warning"
                    onClick={handleAddEvent}
                >
                  추가
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => setModalShow(false)}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Center;
