import React from "react";
import { Form, message } from "antd";
import "../style/Register.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../Redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelForm = async (event) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/register", event);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/login");
        return false;
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={handelForm} className="register-form">
          <h3>Register Form</h3>
          <Form.Item label="Name" name="name">
            <input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <input type="password" required />
          </Form.Item>
          <Form.Item label="Confirm-password" name="conformpass">
            <input type="password" required />
          </Form.Item>
          <Link to="/login" className="p-2">
            Already have an account?
          </Link>
          <button className="btn btn-primary ">Register</button>
        </Form>
      </div>
    </>
  );
}

export default Register;
