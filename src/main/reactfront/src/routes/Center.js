import React, { useState, useEffect } from "react";

export default function Center({ currentMonth, currentYear, onPrevMonthClick, onNextMonthClick }) {
  const [firstDay, setFirstDay] = useState(null);
  const [lastDay, setLastDay] = useState(null);
  const [year, setYear] = useState(0);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = currentMonth; // 현재 월 가져오기

    const firstDayOfMonth = new Date(year, month, 1); // 월의 첫째 날
    const lastDayOfMonth = new Date(year, month + 1, 0); // 월의 마지막 날

    setFirstDay(firstDayOfMonth);
    setLastDay(lastDayOfMonth);
    setYear(year);
  }, [currentMonth]);

  useEffect(() => {
    const monthName = [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월"
    ][currentMonth];
    document.getElementById("currentMonth").innerHTML = `${currentYear}.${monthName} `;
  }, [currentMonth, currentYear]);

  const handlePrevBtnClick = () => {
    const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    onPrevMonthClick(newMonth, newYear);
  };

  const handleNextBtnClick = () => {
    const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    onNextMonthClick(newMonth, newYear);
  };

  const renderDays = () => {
    const days = [];
    let week = [];

    if (!firstDay) return days;

    days.push(
      <div key="first-row" className="divTableRow">
        {[...Array(firstDay.getDay())].map((_, index) => (
          <div key={`empty-${index}`} className="divTableCell">
            &nbsp;
          </div>
        ))}
        {[...Array(7 - firstDay.getDay())].map((_, index) => (
          <div
            key={`day-${firstDay.getDate() + index}`}
            className="divTableCell"
          >
            {firstDay.getDate() + index}
          </div>
        ))}
      </div>
    );

    let currentDate = new Date(year, currentMonth, 1 + (7 - firstDay.getDay()));
    while (currentDate.getMonth() === currentMonth) {
      week = [];
      for (let i = 0; i < 7; i++) {
        if (currentDate.getMonth() !== currentMonth) {
          // 현재 월이 아닌 경우에는 빈 칸을 추가
          week.push(
              <div key={`empty-${currentDate.getDate()}`} className="divTableCell">
                &nbsp;
              </div>
          );
        } else {
          week.push(
              <div key={`day-${currentDate.getDate()}`} className="divTableCell">
                {currentDate.getDate()}
              </div>
          );
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      days.push(<div key={`week-${currentDate.getDate()}`} className="divTableRow">{week}</div>);
    }

    return days;
  };

  return (
    <div className={"divTable"}>
      <div className="divTableBody">
        <div className="divTableRow">
          <div className="divTableCell">일</div>
          <div className="divTableCell">월</div>
          <div className="divTableCell">화</div>
          <div className="divTableCell">수</div>
          <div className="divTableCell">목</div>
          <div className="divTableCell">금</div>
          <div className="divTableCell">토</div>
        </div>
        {renderDays()}
      </div>
    </div>
  );
}
