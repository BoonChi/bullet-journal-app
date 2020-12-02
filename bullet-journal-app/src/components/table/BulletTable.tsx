import React, { useState, useEffect } from "react";
import "./BulletTable.css";
import API from "../../utils/API";
import { Table, Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import ModalPop from "../modal/ModalPop";
interface displayData {
  duration: number;
  details: string;
  _id: string;
  type: string;
}
type Props = { refresh: Boolean };
const BulletTable: React.FC<Props> = ({ refresh }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  let [responseData, setResponseData] = useState([]);
  let [editData, setEditData] = useState({
    type: "",
    duration: 1,
    details: "",
    _id: "",
  });
  const deleteData = async (param: string) => {
    await API.delete("http://localhost:9000/logs/", { data: { id: param } })
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
  const capitaliseFirstLetter = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const editOperation = (dataPassed: displayData) => {
    setEditData(dataPassed);
    setShowEdit(true);
  };
  useEffect(() => {
    // GET request using axios inside useEffect React hook
    API.get("logs/")
      .then((response) => {
        console.log("callbackend");
        setResponseData(response.data);
      })
      .then(() => setLoading(false));
  }, [loading, refresh]);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Duration</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {responseData.map((row: displayData) => (
            <tr>
              <td>{capitaliseFirstLetter(row.type)} Log</td>
              <td>{row.duration}</td>
              <td>{row.details}</td>
              <td>
                <Button
                  className="actionButton"
                  variant="outline-danger"
                  onClick={() => deleteOperation(row._id)}
                >
                  DELETE
                </Button>
                <Button
                  className="actionButton"
                  variant="outline-primary"
                  onClick={() => editOperation(row)}
                >
                  EDIT
                </Button>
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
          ></ModalPop>
        ) : null}
      </div>
    </div>
  );
};

export default BulletTable;
