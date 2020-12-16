import React from "react";
import Constant from "../../Constant";
type Props = {
  show?: boolean;
  onHide?: () => void;
  onSubmit?: () => void;
  type: "daily" | "monthly" | "future";
  details?: string;
  duration?: number;
  dataId?: string;
  itemType?: string;
  day?: number;
  month?: number;
  year?: number;
  onLogAdd: (log: any) => void;
  onLogUpdate: (log: any) => void;
};
const LogForm: React.FC<Props> = (props) => {
  const handleSubmit = async (e: React.SyntheticEvent) => {
    props.onSubmit && props.onSubmit();
    e.preventDefault();
    const target = e.target as typeof e.target & {
      details: { value: string };
      duration: { value: number };
      type: { value: string };
      itemType: { value: string };
      day: { value: number };
      month: { value: number };
      year: { value: number };
    };
    const param: {} = {
      details: target.details.value,
      duration: target.duration.value,
      type: target.type.value,
      mark: false,
      itemType: target.itemType.value,
      day: target.day ? target.day.value : null,
      month: target.month ? target.month.value : null,
      year: target.year ? target.year.value : null,
      id: props.dataId ? props.dataId : null,
    };
    if (!props.dataId) {
      //add
      props.onLogAdd && props.onLogAdd(param);
    } else {
      props.onLogUpdate && props.onLogUpdate(param);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label style={{ marginBottom: 10 }}>Item types</label>
      </div>
      <div>
        <select
          style={{ marginBottom: 10 }}
          name="itemType"
          defaultValue={props.itemType}
        >
          {Constant.itemTypeOptions.map((itemTypeOption) => (
            <option value={itemTypeOption.value}>{itemTypeOption.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Details</label>
      </div>
      <textarea name="details" defaultValue={props.details} />
      <div>
        <label>Duration(Hour):</label>
      </div>
      <div>
        <input type="number" name="duration" defaultValue={props.duration} />
      </div>
      <div>
        <label style={{ marginTop: 10 }}>Log types</label>
      </div>

      <div>
        <select
          style={{ marginBottom: 10 }}
          name="type"
          defaultValue={props.type}
        >
          {Constant.logTypeOptions.map((logTypeOption) => (
            <option value={logTypeOption.value}>{logTypeOption.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label style={{ marginBottom: 10 }}>Set Day</label>
      </div>
      <div>
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
      <div>
        <label style={{ marginBottom: 10 }}>Set Month</label>
      </div>
      <div>
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
      <div>
        <label style={{ marginBottom: 10 }}>Set Year</label>
      </div>
      <div>
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
      <button className="button" type="submit">
        {props.dataId ? "EDIT" : "ADD"}
      </button>
    </form>
  );
};

export default LogForm;
