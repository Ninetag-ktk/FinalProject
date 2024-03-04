// Center.js
import React, { useState, useEffect } from "react";

export default function Center({ handleNextMonthClick }) {
  const [firstDay, setFirstDay] = useState(null);
  const [lastDay, setLastDay] = useState(null);
  const [year, setYear] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear = currentYear - 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleNextBtnClick = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear = currentYear + 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    setFirstDay(firstDayOfMonth);
    setLastDay(lastDayOfMonth);
    setYear(year);
  }, []);

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
        week.push(
          <div key={`day-${currentDate.getDate()}`} className="divTableCell">
            {currentDate.getDate()}
          </div>
        );
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