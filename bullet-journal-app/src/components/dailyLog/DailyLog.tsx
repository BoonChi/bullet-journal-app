import React, { useState } from "react";
import BulletTable from "../table/BulletTable";
import "./DailyLog.css";
import { FaCalendarPlus } from "react-icons/fa";
import ModalPop from "../modal/ModalPop";

const DailyLog: React.FC = () => {
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };
  return (
    <div>
      <div className="headerBar">
        <div className="headerTitle">Daily Log</div>
        <div className="addNew">
          <FaCalendarPlus onClick={handleOpen} />
          {console.log("refresh and show", refresh, show)}
          {show ? (
            <ModalPop
              show={show}
              onHide={handleClose}
              onSubmit={() => {
                setShow(false);
                setRefresh(true);
              }}
              type={"daily"}
            ></ModalPop>
          ) : null}
        </div>
      </div>
      <BulletTable refresh={refresh}></BulletTable>
    </div>
  );
};

export default DailyLog;
