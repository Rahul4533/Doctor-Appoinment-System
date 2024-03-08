import React, { useEffect, useState } from "react";
import LayOut from "../components/LayOut";
import { Table, message } from "antd";
import axios from "axios";
import moment from "moment";
export default function Apponiment() {
  const [Appoinment, setAppoinment] = useState();
  console.log(Appoinment);
  const getappoinment = async () => {
    try {
      const res = await axios.get("/userappoinment", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        message.success(res.data.message);
        setAppoinment(res.data.appoinment);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getappoinment();
  }, []);

  const appoinment = [
    {
      title: "DoctorID",
      dataIndex: "doctorId",
    },
    {
      title: "Dr.Name",
      dataIndex: "name",
      render: (text, records) => (
        <span>
          {records.doctorInfo.firstname} {records.doctorInfo.lastname}
        </span>
      ),
    },
    {
      title:"Phone",
       render: (records)=>(
        <span>
          {records.doctorInfo.phone}
        </span>
       )
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
}
