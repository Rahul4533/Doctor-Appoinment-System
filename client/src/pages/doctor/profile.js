import React, { useEffect, useState } from "react";
import LayOut from "../../components/LayOut";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Col, Row, Form, Input, TimePicker, message } from "antd";
import { showLoading, hideLoading } from "../../Redux/features/alertSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Profile() {
  const { user } = useSelector((state) => state.user);

  const [doctor, setDoctor] = useState();
  const parm = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelfinish = async (e) => {
    const startTime = e.timing[0].format("HH:mm");
    const endTime = e.timing[1].format("HH:mm");

    try {
      window.location.reload();
      dispatch(showLoading());
      const res = await axios.post(
        "/doctor/update-doctor-profile",
        {
          ...e,
          userId: user._id,
          timing: [startTime, endTime],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (res.data.success) {
        message.success(res.data.message);

        navigate("/");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const getdoctorsProfile = async () => {
    try {
      const res = await axios.post(
        "/doctor/getdoctorsInfo",
        { userId: parm },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        setDoctor(res.data.doctor);
      } else {
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdoctorsProfile();
    //eslint-disable-next-line
  }, []);

  return (
    <LayOut>
      <h1>Manage Profile</h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handelfinish}
          className="m-3 display-flex"
          initialValues={{
            ...doctor,
            timing: []
          }}
        >
          <h4>Personal Details</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstname"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastname"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="last name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="number" placeholder="Enter Phone" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="Email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Website"   
                name="website"
                rules={[{ required: false }]}
              >
                <Input type="text" placeholder="URL" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Address" />
              </Form.Item>
            </Col>
          </Row>
          <h4 className="m-2">Professional Details</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specializations"
                name="specializations"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="special For " />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experiance"
                name="experiance"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Experiance " />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Fee"
                name="fees"
                required
                rules={[{ required: true }]}
              >
                <Input type="number" placeholder="Fee" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Time" name="timing" required>
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}></Col>

            <Col xs={24} md={24} lg={8}>
              <button className="btn btn-primary form-btn" type="submit">
                Update
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </LayOut>
  );
}
