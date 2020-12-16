import React, { useEffect, useState } from "react";
import BulletTable from "../table/BulletTable";
import { FaCalendarPlus } from "react-icons/fa";
import ModalPop from "../modal/ModalPop";
import capitaliseFirstLetter from "../../utils/commonFunction";
import "./Page.css";
import CalendarLog from "../calendar/CalendarLog";
import { confirmAlert } from "react-confirm-alert"; // Import
import API from "../../utils/API";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
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
  type: "daily" | "monthly" | "future";
};
const Page: React.FC<Props> = (props) => {
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
  const editOperation = (dataPassed: displayData) => {
    setEditData(dataPassed);
    setShowEdit(true);
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
  const markOperation = (param: displayData) => {
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
  const addOperation = async (params: {}) => {
    await API.post("logs/", params);
  };
  const updateOperation = async (params: {}) => {
    await API.put("logs/", params);
  };
  useEffect(() => {
    // GET request using axios inside useEffect React hook
    API.get("logs/" + props.type + "/" + currentDate)
      .then((response) => {
        console.log("callbackend", response.data);
        setResponseData(response.data);
      })
      .then(() => {
        setLoading(false);
        setRefresh(false);
      });
  }, [loading, refresh, props.type, currentDate]);
  return (
    <div>
      <div className="headerBar">
        <div className="headerTitle">
          {props.type ? capitaliseFirstLetter(props.type) + " Log" : "Logs"}
        </div>
        <div className="addNew">
          <FaCalendarPlus onClick={handleOpen} />
          {show ? (
            <ModalPop
              show={show}
              onHide={handleClose}
              onSubmit={() => {
                setShow(false);
                setRefresh(true);
              }}
              onLogAdd={addOperation}
              onLogUpdate={updateOperation}
              type={props.type}
            ></ModalPop>
          ) : null}
        </div>
      </div>
      <div className="row">
        <CalendarLog parentCallback={getSelectedDate}></CalendarLog>
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
          <ModalPop
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
          ></ModalPop>
        ) : null}
      </div>
    </div>
  );
};

export default Page;
