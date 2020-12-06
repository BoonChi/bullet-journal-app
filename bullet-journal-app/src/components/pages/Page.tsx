import React, { useState } from "react";
import BulletTable from "../table/BulletTable";
import { FaCalendarPlus } from "react-icons/fa";
import ModalPop from "../modal/ModalPop";
import capitaliseFirstLetter from "../../utils/commonFunction";
import "./Page.css";
type Props = {
  type: string;
};
const Page: React.FC<Props> = ({ type }) => {
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };
  const getProp = () => {
    setRefresh(false);
  };
  return (
    <div>
      <div className="headerBar">
        <div className="headerTitle">
          {type ? capitaliseFirstLetter(type) + " Log" : "Logs"}
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
              type={type}
            ></ModalPop>
          ) : null}
        </div>
      </div>
      <BulletTable
        refresh={refresh}
        logType={type}
        sendProp={getProp}
      ></BulletTable>
    </div>
  );
};

export default Page;
