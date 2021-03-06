import React from "react";
import { Modal } from "react-bootstrap";
import "./LogModal.css";
import LogForm from "../logForm/LogForm";

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
  actionTitle?: string;
};
const LogModal: React.FC<Props> = (props) => {
  return (
    <Modal
      show={props.show}
      handleClose={props.onHide}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton onClick={props.onHide}>
        <Modal.Title>{props.actionTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LogForm
          itemType={props.itemType}
          details={props.details}
          duration={props.duration}
          type={props.type}
          dataId={props.dataId}
          day={props.day}
          month={props.month}
          year={props.year}
          onLogAdd={props.onLogAdd}
          onSubmit={props.onSubmit}
          onLogUpdate={props.onLogUpdate}
          actionTitle={props.actionTitle}
        ></LogForm>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default LogModal;
