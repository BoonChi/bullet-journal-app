import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
type Props = { parentCallback: (data: string) => void };
const CalendarLog: React.FC<Props> = ({ parentCallback }) => {
  const [value, setValue] = useState(new Date());
  const changeSelectedDate = (date: any) => {
    setValue(date);
  };
  parentCallback(value.toLocaleDateString());
  return <Calendar onChange={changeSelectedDate} value={value} />;
};

export default CalendarLog;
