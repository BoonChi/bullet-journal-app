import React, { ChangeEvent, useState } from "react";
import Constant from "../../Constant";
import LogTypeSelector from "../logTypeSelector/LogTypeSelector";
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
  const [logType, setLogType] = useState("");
  const logTypeSelector = (event: ChangeEvent<HTMLSelectElement>) => {
    setLogType(event.currentTarget.value);
  };
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
        <label>Item types</label>
      </div>
      <div>
        <select name="itemType" defaultValue={props.itemType}>
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
        <label>Log types</label>
      </div>

      <div>
        <select
          name="type"
          defaultValue={props.type}
          onChange={logTypeSelector}
        >
          {Constant.logTypeOptions.map((logTypeOption) => (
            <option value={logTypeOption.value}>{logTypeOption.label}</option>
          ))}
        </select>
      </div>
      <LogTypeSelector
        day={props.day}
        month={props.month}
        year={props.year}
        logTypeSelected={logType}
        defaultLogType={props.type}
      ></LogTypeSelector>
      <button className="button" type="submit">
        {props.dataId ? "EDIT" : "ADD"}
      </button>
    </form>
  );
};

export default LogForm;
