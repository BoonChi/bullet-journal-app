import React, { ChangeEvent } from "react";
import { Button, Modal } from "react-bootstrap";
import "./ModalPop.css";
import API from "../../utils/API";
import Constant from "../../Constant";

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
  day,
  month,
  year,
}) => {
  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {};
  const handleSubmit = async (e: React.SyntheticEvent) => {
    onSubmit && onSubmit();
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
    if (!dataId) {
      //add
      await API.post("logs/", {
        details: target.details.value,
        duration: target.duration.value,
        type: target.type.value,
        mark: false,
        itemType: target.itemType.value,
        day: target.day ? target.day.value : null,
        month: target.month ? target.month.value : null,
        year: target.year ? target.year.value : null,
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
        itemType: target.itemType.value,
        day: target.day ? target.day.value : null,
        month: target.month ? target.month.value : null,
        year: target.year ? target.year.value : null,
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
            <select
              style={{ marginBottom: 10 }}
              name="type"
              defaultValue={type}
              onChange={handleTypeChange}
            >
              {Constant.logTypeOptions.map((logTypeOption) => (
                <option value={logTypeOption.value}>
                  {logTypeOption.label}
                </option>
              ))}
            </select>
          </div>
          {/* <div>
            <label style={{ marginBottom: 10 }}>Set Date</label>
          </div>
          <div>
            <select
              style={{ marginBottom: 10 }}
              name={Constant.dateType[type]}
              defaultValue={day}
            >
              {dateOption.length > 0
                ? dateOption.map((option: number | undefined) => (
                    <option value={option}>{option}</option>
                  ))
                : Constant.daysNumber.map((day: number) => (
                    <option value={day}>{day}</option>
                  ))}
            </select>
          </div> */}
          <div>
            <label style={{ marginBottom: 10 }}>Set Day</label>
          </div>
          <div>
            <select style={{ marginBottom: 10 }} name="day" defaultValue={day}>
              {Constant.daysNumber.map((day: number) => (
                <option value={day}>{day}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ marginBottom: 10 }}>Set Month</label>
          </div>
          <div>
            <select
              style={{ marginBottom: 10 }}
              name="month"
              defaultValue={month}
            >
              {Constant.monthNumber.map((month: number) => (
                <option value={month}>{month}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ marginBottom: 10 }}>Set Year</label>
          </div>
          <div>
            <select
              style={{ marginBottom: 10 }}
              name="year"
              defaultValue={year}
            >
              {Constant.yearNumber.map((year: number) => (
                <option value={year}>{year}</option>
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
