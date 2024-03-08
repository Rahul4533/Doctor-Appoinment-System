import React, { useState } from "react";
import { useEffect } from "react";
import LayOut from "../../components/LayOut";
import { Table, message } from "antd";
import axios from "axios";
const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const getdoctor = async () => {
    try {
      const res = await axios.get("/admin/getalldoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(res);

      if (res.data.success) {
        message.success(res.data.message);
        setDoctors(res.data.Doctors);
      } else {
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    }
  };
  const changestatus = async (record,status) => {
         console.log(record,status);
    try {
      const res = await axios.post(
        "/admin/status-approved",
        {
          DoctorId:record._id,
          status:status,
          userId:record.userId
        },
        {
          headers: {
            Authorization: `Brarer ${localStorage.getItem("token")}`,
          },
        }
      )

      if(res.data.success){
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    }
  };

  useEffect(() => {
    getdoctor();
  }, []);

  const column = [
    {
      title: "Name",
      render: (text, records) => `${records.firstname} ${records.lastname}`,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Specializations",
      dataIndex: "specializations",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button className="btn btn-success" onClick={() => changestatus(record,'approved')}>
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <LayOut>
      <Table
        columns={column}
        dataSource={doctors}
        style={{ backgroundColor: "#f2f2f2", marginBottom: "2px" }}
      ></Table>
    </LayOut>
  );
};

export default Doctors;
