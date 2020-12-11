import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./ModalPop.css";
import API from "../../utils/API";
import Constant from "../../Constant";

type Props = {
  show?: boolean;
  onHide?: () => void;
  onSubmit?: () => void;
  type?: string;
  details?: string;
  duration?: number;
  dataId?: string;
  itemType?: string;
};

const ModalPop: React.FC<Props> = ({
  show,
  onHide,
  onSubmit,
  type,
  details,
  duration,
  dataId,
  itemType,
}) => {
  const handleSubmit = async (e: React.SyntheticEvent) => {
    onSubmit && onSubmit();
    e.preventDefault();
    const target = e.target as typeof e.target & {
      details: { value: string };
      duration: { value: number };
      type: { value: string };
      itemType: { value: string };
    };
    if (!dataId) {
      //add
      await API.post("logs/", {
        details: target.details.value,
        duration: target.duration.value,
        type: target.type.value,
        mark: false,
      })
        .then(function (response) {
          //update latest table
          //close modal
          //both need to update the state from BulletTable
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      await API.put("logs/", {
        details: target.details.value,
        duration: target.duration.value,
        id: dataId,
        type: target.type.value,
      })
        .then(function (response) {
          //update the list
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <Modal show={show} handleClose={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>{dataId ? "EDIT LOG" : "ADD LOG"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ marginBottom: 10 }}>Item types</label>
          </div>
          <div>
            <select
              style={{ marginBottom: 10 }}
              name="itemType"
              defaultValue={itemType}
            >
              {Constant.itemTypeOptions.map((itemTypeOption) => (
                <option value={itemTypeOption.value}>
                  {itemTypeOption.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Details</label>
          </div>
          <textarea name="details" defaultValue={details} />
          <div>
            <label>Duration(Hour):</label>
          </div>
          <div>
            <input type="number" name="duration" defaultValue={duration} />
          </div>
          <div>
            <label style={{ marginTop: 10 }}>Log types</label>
          </div>

          <div>
            <select name="type" defaultValue={type}>
              {Constant.logTypeOptions.map((logTypeOption) => (
                <option value={logTypeOption.value}>
                  {logTypeOption.label}
                </option>
              ))}
            </select>
          </div>
          <Button className="button" variant="primary" type="submit">
            {dataId ? "EDIT" : "ADD"}
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default ModalPop;
