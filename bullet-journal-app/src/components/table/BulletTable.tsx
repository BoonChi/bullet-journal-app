import React, { useState, useEffect } from "react";
import "./BulletTable.css";
import API from "../../utils/API";
import { Table, Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import ModalPop from "../modal/ModalPop";
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
  refresh: Boolean;
  logType: string;
  sendProp: () => void;
  currentDate: string;
};
const BulletTable: React.FC<Props> = ({
  refresh,
  logType,
  sendProp,
  currentDate,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  let [responseData, setResponseData] = useState([]);
  let [editData, setEditData] = useState({
    type: "daily" as "daily" | "monthly" | "future",
    duration: 1,
    details: "",
    _id: "",
    itemType: "",
    day: 1,
    month: 1,
    year: 1,
  });
  const renderSwitch = () => {
    switch (logType) {
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
  const deleteData = async (param: string) => {
    await API.delete("logs/", { data: { id: param } })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };
  const deleteOperation = (param: string) => {
    //confirm delete?
    confirmAlert({
      title: "DELETE",
      message: "Are you sure to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteData(param);
            setLoading(true);
            // setResponseData(newResponseData);
          },
        },
        {
          label: "No",
          onClick: () => null, //alert("Click No"),
        },
      ],
    });
  };
  const markData = async (param: displayData) => {
    await API.put("logs/", {
      mark: !param.mark,
      id: param._id,
    });
  };
  const markedLog = (param: displayData) => {
    let title = "null";
    !param.mark ? (title = "Mark as done") : (title = "Mark as undone");
    confirmAlert({
      title: title,
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            markData(param);
            setLoading(true);
          },
        },
        {
          label: "No",
          onClick: () => null, //alert("Click No"),
        },
      ],
    });
  };

  const editOperation = (dataPassed: displayData) => {
    setEditData(dataPassed);
    setShowEdit(true);
  };

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    console.log(logType, currentDate);
    API.get("logs/" + logType + "/" + currentDate)
      .then((response) => {
        console.log("callbackend", response.data);
        setResponseData(response.data);
      })
      .then(() => {
        setLoading(false);
        sendProp && sendProp();
      });
  }, [loading, refresh, logType, currentDate]);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Type</th>
            {logType ? <th>{renderSwitch()}</th> : null}
            <th>Title</th>
            <th>Details</th>
            {logType ? <th>Duration(hr)</th> : null}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {console.log(responseData)}
          {responseData.map((row: displayData) => (
            <tr key={row._id} className={row.mark ? "strikeThrough" : ""}>
              {logType ? (
                <td>
                  {row.itemType ? capitaliseFirstLetter(row.itemType) : null}
                </td>
              ) : null}
              <td>
                {row.day}/{row.month}/{row.year}
              </td>
              <td>{capitaliseFirstLetter(row.type)} Log</td>
              <td>{row.details}</td>
              {logType ? <td>{row.duration}</td> : null}
              <td>
                <BsFillTrashFill
                  className="actionButton"
                  onClick={() => deleteOperation(row._id)}
                >
                  DELETE
                </BsFillTrashFill>
                <BiEdit
                  className="actionButton"
                  onClick={() => editOperation(row)}
                >
                  EDIT
                </BiEdit>
                <BiCheckCircle
                  className="actionButton"
                  onClick={() => markedLog(row)}
                >
                  {row.mark ? "UNDONE" : "DONE"}
                </BiCheckCircle>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        {showEdit ? (
          <ModalPop
            show={showEdit}
            onHide={handleCloseEdit}
            onSubmit={() => {
              setShowEdit(false);
              setLoading(true);
            }}
            details={editData?.details}
            duration={editData?.duration}
            dataId={editData?._id}
            type={editData?.type}
            itemType={editData?.itemType}
          ></ModalPop>
        ) : null}
      </div>
    </div>
  );
};

export default BulletTable;
