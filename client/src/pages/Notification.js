import React from "react";
import LayOut from "../components/LayOut";
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../Redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Notification() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelmarkallread = async () => {
    try {
      window.location.reload();
      dispatch(showLoading());
      const res = await axios.post(
        "/get-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.success(res.data.message);
      }
     
      dispatch(hideLoading());
       
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  const handeldelteallread = async() => {

    try {
      dispatch(showLoading());

      const res= await axios.post('/delete-all-notification',{userId:user._id},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })


      if(res.data.success){
        message.success(res.data.message)
      }else{
        message.success(res.data.message)
      }

      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error)
      message.error('something went wrong');
      
    }
  };

  return (
    <LayOut>
      <h3 className="p-3 text-center"> Notification </h3>
      <Tabs>
        <Tabs.TabPane tab="unread" key={0}>
          <div
            className="d-flex justify-content-end"
            style={{ cursor: "pointer" }}
          >
            <h3 className="p-2" onClick={handelmarkallread}>
              Mark all read
            </h3>
          </div>

          {user?.notification.map((m) => (
            <div
              className="card"
              onClick={() => navigate(`${m.data.onClickpath}`)}
              style={{cursor:'pointer',background:'lightblue',color:'black' }}
            >
              <div className="card-text">{m.message}</div>
            </div>
          ))}
        </Tabs.TabPane>

        <Tabs.TabPane tab="read" key={1}>
          <div className="d-flex justify-content-end" style={{cursor:'pointer'}}>
            <h3 className="p-2" onClick={handeldelteallread} >
              Delete all read
            </h3>
          </div>
          {user?.seennotification.map((seen) => (
            <div
              className="card m-2 p-1"
              onClick={() => navigate(`${seen.data.onClickpath}`)} style={{cursor:'pointer',background:'lightblue',color:'black' }}
            >
              <div className="card-text">{seen.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </LayOut>
  );
}
