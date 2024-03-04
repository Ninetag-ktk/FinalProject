
// Center.js

import React, { useState, useEffect } from "react";

export default function Center() {
  const [firstDay, setFirstDay] = useState(null);
  const [lastDay, setLastDay] = useState(null);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);

  useEffect(() => {
    const today = new Date(); // 2024년 3월 1일을 기준으로 설정합니다.
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    setFirstDay(firstDayOfMonth);
    setLastDay(lastDayOfMonth);
    setYear(year);
    setMonth(month);
  }, []);

  const renderDays = () => {
    const days = [];
    let week = []; // 각 주를 담는 배열

    if (!firstDay) return days; // firstDay가 null일 때 빈 배열 반환

    // 첫째 주의 빈 날짜와 함께 실제 날짜를 출력합니다.
    days.push(
      <div key="first-row" className="divTableRow">
        {[...Array(firstDay.getDay())].map((_, index) => (
          <div key={`empty-${index}`} className="divTableCell">&nbsp;</div>
        ))}
        {[...Array(7 - firstDay.getDay())].map((_, index) => (
          <div key={`day-${firstDay.getDate() + index}`} className="divTableCell">{firstDay.getDate() + index}</div>
        ))}
      </div>
    );

    // 나머지 주의 날짜를 출력합니다.
    let currentDate = new Date(year, month, 1 + (7 - firstDay.getDay())); // 다음 주의 시작일로 설정합니다.
    while (currentDate.getMonth() === month) {
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
