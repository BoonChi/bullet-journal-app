import React, { useState, useEffect, ChangeEvent } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Constant from "../../Constant";
type Props = {
  parentCallback: (data: string) => void;
  type: "daily" | "monthly" | "future";
};
const CalendarLog: React.FC<Props> = (props) => {
  const currentDate = new Date();
  const [value, setValue] = useState(currentDate);
  const [month, setMonth] = useState((currentDate.getMonth() + 1).toString());
  const [year, setYear] = useState(currentDate.getFullYear().toString());
  const changeSelectedDate = (date: any) => {
    setValue(date);
  };
  const changeSelectedMonth = (event: ChangeEvent<HTMLSelectElement>) => {
    setMonth(event.currentTarget.value.toString());
  };
  const changeSelectedYear = (event: ChangeEvent<HTMLSelectElement>) => {
    setYear(event.currentTarget.value);
  };
  const checkPropType = () => {
    switch (props.type) {
      case "daily":
        return props.parentCallback(value.toLocaleDateString());
      case "monthly":
        return props.parentCallback(month + "/" + year);
      case "future":
        return props.parentCallback(year);
    }
  };
  useEffect(() => {
    checkPropType();
  }, [value, month, year, props.type]);
  return (
    <div> 
      {props.type === "daily" ? (
        <Calendar className="middle" onChange={changeSelectedDate} value={value} />
      ) : null}
      {props.type === "monthly" ? (
        <div className="margin-left-45">
          <select onChange={changeSelectedMonth} value={month}>
            {Constant.monthNumber.map((month: number) => (
              <option value={month}>{month}</option>
            ))}
          </select>
          <select onChange={changeSelectedYear} value={year}>
            {Constant.yearNumber.map((year: number) => (
              <option value={year}>{year}</option>
            ))}
          </select>
        </div>
      ) : null}
      {props.type === "future" ? (
        <select className="margin-left-45" onChange={changeSelectedYear} defaultValue={year}>
          {Constant.yearNumber.map((year: number) => (
            <option value={year}>{year}</option>
          ))}
        </select>
      ) : null}
    </div>
  );
};

export default CalendarLog;
