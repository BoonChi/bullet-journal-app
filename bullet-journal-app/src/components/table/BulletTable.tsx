import React, { useState } from "react";
import "./BulletTable.css";
import { Table } from "react-bootstrap";
import LogsDetailsRow from "../logsDetailsRow/LogsDetailsRow";
interface displayData {
  duration: number;
  details: string;
  _id: string;
  type: "daily" | "monthly" | "future";
  mark: Boolean;
  itemType: string;
  day: number;
  month: number;
  year: number;
}
type Props = {
  logType: string;
  tableData: displayData[];
  onLogEdit: (log: any) => void;
  onLogDelete: (log: any) => void;
  onLogMark: (log: any) => void;
};
const BulletTable: React.FC<Props> = (props) => {
  const renderSwitch = () => {
    switch (props.logType) {
      case "daily":
        return "Day";
      case "monthly":
        return "Month";
      case "future":
        return "Year";
      default:
      //
    }
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Type</th>
            {props.logType ? <th>{renderSwitch()}</th> : null}
            <th>Title</th>
            <th>Details</th>
            <th>Duration(hr)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.tableData?.map((row: displayData) => (
            <LogsDetailsRow
              logType={props.logType}
              logDetailRow={row}
              onLogEdit={props.onLogEdit}
              onLogDelete={props.onLogDelete}
              onLogMark={props.onLogMark}
            ></LogsDetailsRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BulletTable;
