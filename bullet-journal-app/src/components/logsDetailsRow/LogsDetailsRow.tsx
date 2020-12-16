import React from "react";
import capitaliseFirstLetter from "../../utils/commonFunction";
import { BsFillTrashFill } from "react-icons/bs";
import { BiEdit, BiCheckCircle } from "react-icons/bi";
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
  logDetailRow: displayData;
  logType: string;
  onLogDelete: (log: any) => void;
  onLogEdit: (log: any) => void;
  onLogMark: (log: any) => void;
};
const LogsDetailsRow: React.FC<Props> = (props) => {
  return (
    <tr
      key={props.logDetailRow._id}
      className={props.logDetailRow.mark ? "strikeThrough" : ""}
    >
      {props.logType ? (
        <td>
          {props.logDetailRow.itemType
            ? capitaliseFirstLetter(props.logDetailRow.itemType)
            : null}
        </td>
      ) : null}
      <td>
        {props.logDetailRow.day}/{props.logDetailRow.month}/
        {props.logDetailRow.year}
      </td>
      <td>{capitaliseFirstLetter(props.logDetailRow.type)} Log</td>
      <td>{props.logDetailRow.details}</td>
      {props.logType ? <td>{props.logDetailRow.duration}</td> : null}
      <td>
        <BsFillTrashFill
          className="actionButton"
          onClick={() => props.onLogDelete(props.logDetailRow._id)}
        >
          DELETE
        </BsFillTrashFill>
        <BiEdit
          className="actionButton"
          onClick={() => props.onLogEdit && props.onLogEdit(props.logDetailRow)}
        >
          EDIT
        </BiEdit>
        <BiCheckCircle
          className="actionButton"
          onClick={() => props.onLogMark(props.logDetailRow)}
        >
          {props.logDetailRow.mark ? "UNDONE" : "DONE"}
        </BiCheckCircle>
      </td>
    </tr>
  );
};

export default LogsDetailsRow;
