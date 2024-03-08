import { useEffect, useState } from "react";
import LayOut from "../components/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/features/alertSlice";
import moment from 'moment';
const BookingPage = () => {
  const parm = useParams();
  const [doctor, setDoctor] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState(null);
  const [isAvilable, setisAvilable] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);



   

   const handelTime=(time, timeString)=>{
        setTime(time);
   }

  const getdoctorbyid = async () => {
    try {
      const res = await axios.post(
        "/doctor/getDoctorById",
        { doctorId: parm.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        setDoctor(res.data.data);
      } else {
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const handelBooking = async () => {
    try {
      dispatch(showLoading());

      const res = await axios.post(
        "/book-appoinment",
        {
          doctorId: parm.id,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
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
    }
  };


  const handelAvailability=async()=>{
try {
      // dispatch(showLoading())
     const res= await axios.post('/check-avibility',{
      doctorId:parm.id,
      date,time
     },
     {
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
     })

     if(res.data.success){
      setisAvilable(true);
      message.success(res.data.message);
     }else{ 
      message.success(res.data.message);
     }

    
  //dispatch(hideLoading());
} catch (error) {
  dispatch(hideLoading())
  console.log(error);
  
}

  }

  useEffect(() => {
    getdoctorbyid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LayOut>
        <h1 className="text-center ">Booking Page</h1>
        <div className="container m-2">
          {doctor && (
            <div>
              <h4>
                Dr {doctor.firstname} {doctor.lastname}
              </h4>
              <h5>Specialazition:{doctor.specializations}</h5>
              <h5>Experiance:{doctor.experiance}</h5>
              <h4>Fee:{doctor.fees}</h4>

              <div className="d-flex flex-column w-50  ">
                <DatePicker
                  format="DD:MM:YYYY"
                  className="m-1"
                  onChange={(value) =>{
                   setDate(moment(value).format("DD-MM-YYYY"))
                  }
                  }
                />
                <TimePicker
                  format="HH:mm"
                  className="m-2"
                  onChange={
                     handelTime
                  }
                  
                />
                <button className="btn btn-primary m-1" onClick={handelAvailability}>Check-Avability</button>
                {isAvilable && (
                  <button className="btn btn-dark" onClick={handelBooking}>
                  Book-Now
                </button>
                )}
              </div>
            </div>
          )}
        </div>
      </LayOut>
    </>
  );
};

export default BookingPage;
