import React, { useEffect, useState } from "react";
import LayOut from "../../components/LayOut";
import { Table, message } from "antd";
import axios from "axios";
import moment from "moment";
const DoctorAppoinment = () => {
  const [Appoinment, setAppoinment] = useState();

  const handelStatus = async (records, status) => {
    try {
      const res = await axios.post(
        "/doctor/change-Status",
        {
          appoinmentId: records._id,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getappoinment = async () => {
    try {
      const res = await axios.get("/doctor/doctor-Appoinment", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        message.success(res.data.message);
        setAppoinment(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getappoinment();
  }, []);

  const appoinment = [
    {
      title: "PaitentID",
      dataIndex: "userId",
    },
    {
      title: "Patient-Name",
      dataIndex: "name",
      render: (text, records) => <span>{records.userInfo.name}</span>,
    },
    {
      title: "P.Email",
      render: (records) => <span>{records.userInfo.email}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, records) => (
        <span>
          {moment(records.data).format("DD-MM-YYYY")} &nbsp;
          {moment(records.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, records) => (
        <div className="d-flex">
          {records.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success m-1"
                onClick={() => handelStatus(records, "approved")}
              >
                Approve
              </button>
              <button className="btn btn-danger m-1" onClick={()=>handelStatus(records,'Rejected')}>Reject</button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <LayOut>
      <b>
        <h3 className="text-center p-2 " style={{ color: "red" }}>
          Appoinment Details
        </h3>
      </b>
      <hr />
      <Table columns={appoinment} dataSource={Appoinment}></Table>
    </LayOut>
  );
};

export default DoctorAppoinment;
