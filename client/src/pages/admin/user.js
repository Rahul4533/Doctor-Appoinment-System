import React, { useEffect, useState } from "react";
import LayOut from "../../components/LayOut";
import { Table, message } from "antd";
import axios from "axios";

const User = () => {

  const [users,setUsers]=useState([]);
  const getuser = async () => {
    try {
      const res = await axios.get("/admin/getallusers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(res);
      if (res.data.success) {
        message.success(res.data.message);
        setUsers(res.data.Users);
      } else {
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  //antd table
 
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render:(text,records)=>(
        <span>{records.isDoctor?'yes':'No'}</span>
      )
    },
    {
      title:'Actions',
      dataIndex:'actions',
      render:(text,record)=>(
        <div className="d-flex mb-2">
          <button className="btn btn-danger ">Block</button>
        </div>
      ),
    }
  ];

  return (
    <LayOut>

      <Table columns={columns } dataSource={users}  style={{backgroundColor:'#f2f2f2',marginBottom:'2px'}}>

      </Table>
     
    </LayOut>
  );
};

export default User;
