import React from "react";
import Constant from "../../Constant";
type Props = {
  day?: number;
  month?: number;
  year?: number;
  logTypeSelected?: string;
  defaultLogType?: "daily" | "monthly" | "future";
};
let displayDay = false;
let displayMonth = false;
let displayYear = false;
let daySelector = () => {
  displayDay = true;
  displayMonth = true;
  displayYear = true;
};
let monthSelector = () => {
  displayDay = false;
  displayMonth = true;
  displayYear = true;
};
let yearSelector = () => {
  displayDay = false;
  displayMonth = false;
  displayYear = true;
};
const renderTypeSelection = (params: Props) => {
  if (!params.logTypeSelected && params.defaultLogType) {
    if (params.defaultLogType === "daily") {
      daySelector();
    } else if (params.defaultLogType === "monthly") {
      monthSelector();
    } else if (params.defaultLogType === "future") {
      yearSelector();
    }
  } else {
    if (params.logTypeSelected === "daily") {
      daySelector();
    } else if (params.logTypeSelected === "monthly") {
      monthSelector();
    } else if (params.logTypeSelected === "future") {
      yearSelector();
    }
  }
};
const LogTypeSelector: React.FC<Props> = (props) => {
  renderTypeSelection(props);
  return (
    <div>
      {displayDay ? (
        <div>
          <label style={{ marginBottom: 10 }}>Set Day</label>
          <select
            style={{ marginBottom: 10 }}
            name="day"
            defaultValue={props.day}
          >
            {Constant.daysNumber.map((day: number) => (
              <option value={day}>{day}</option>
            ))}
          </select>
        </div>
      ) : null}
      {displayMonth ? (
        <div>
          <label style={{ marginBottom: 10 }}>Set Month</label>
          <select
            style={{ marginBottom: 10 }}
            name="month"
            defaultValue={props.month}
          >
            {Constant.monthNumber.map((month: number) => (
              <option value={month}>{month}</option>
            ))}
          </select>
        </div>
      ) : null}
      {displayYear ? (
        <div>
          <label style={{ marginBottom: 10 }}>Set Year</label>
          <select
            style={{ marginBottom: 10 }}
            name="year"
            defaultValue={props.year}
          >
            {Constant.yearNumber.map((year: number) => (
              <option value={year}>{year}</option>
            ))}
          </select>
        </div>
      ) : null}
    </div>
  );
};

export default LogTypeSelector;
