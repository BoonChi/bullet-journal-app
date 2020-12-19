import React, { useEffect, useState } from "react";
import BulletTable from "../table/BulletTable";
import { FaCalendarPlus } from "react-icons/fa";
import LogModal from "../modal/LogModal";
import capitaliseFirstLetter from "../../utils/commonFunction";
import "./LogDisplay.css";
import CalendarLog from "../calendar/CalendarLog";
import { confirmAlert } from "react-confirm-alert"; // Import
import API, { Log } from "../../utils/API";
import "react-confirm-alert/src/react-confirm-alert.css";
type Props = {
  type: "daily" | "monthly" | "future";
};
const LogDisplay: React.FC<Props> = (props) => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
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
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  let [responseData, setResponseData] = useState([]);
  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };
  const getSelectedDate = (data: string) => {
    setCurrentDate(data);
  };
  const editOperation = (dataPassed: Log) => {
    setEditData(dataPassed);
    setShowEdit(true);
  };
  const deleteData = async (logId: string) => {
    API.deleteLog(logId);
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
  const markData = async (log: Log) => {
    API.updateLogwithMark(log);
  };
  const markOperation = (param: Log) => {
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
  const addOperation = async (log: Log) => {
    API.addLog(log);
  };
  const updateOperation = async (log: Log) => {
    API.updateLog(log);
  };
  const currentDateNotEmpty = currentDate !== "";
  useEffect(() => {
    // GET request using axios inside useEffect React hook
    if (currentDateNotEmpty)
      API.getLog(props.type, currentDate)
        .then((response) => {
          setResponseData(response.data);
        })
        .then(() => {
          setLoading(false);
          setRefresh(false);
        });
  }, [loading, refresh, currentDate]);
  return (
    <div>
      <div className="headerBar">
        <div className="headerTitle">
          {props.type ? capitaliseFirstLetter(props.type) + " Log" : "Logs"}
        </div>
        <div className="addNew">
          <FaCalendarPlus onClick={handleOpen} />
          {show ? (
            <LogModal
              show={show}
              onHide={handleClose}
              onSubmit={() => {
                setShow(false);
                setRefresh(true);
              }}
              onLogAdd={addOperation}
              onLogUpdate={updateOperation}
              type={props.type}
              actionTitle="ADD LOG"
            ></LogModal>
          ) : null}
        </div>
      </div>
      <div className="row">
        <CalendarLog
          parentCallback={getSelectedDate}
          type={props.type}
        ></CalendarLog>
        <BulletTable
          logType={props.type}
          onLogEdit={editOperation}
          onLogDelete={deleteOperation}
          onLogMark={markOperation}
          tableData={responseData}
        ></BulletTable>
      </div>
      <div>
        {showEdit ? (
          <LogModal
            show={showEdit}
            onHide={() => setShowEdit(false)}
            onSubmit={() => {
              setShowEdit(false);
              setLoading(true);
            }}
            details={editData?.details}
            duration={editData?.duration}
            dataId={editData?._id}
            type={editData?.type}
            itemType={editData?.itemType}
            day={editData?.day}
            month={editData?.month}
            year={editData?.year}
            onLogAdd={addOperation}
            onLogUpdate={updateOperation}
            actionTitle="EDIT LOG"
          ></LogModal>
        ) : null}
      </div>
    </div>
  );
};

export default LogDisplay;
