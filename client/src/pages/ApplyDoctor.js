import React from "react";
import LayOut from "../components/LayOut";
import { Col, Row, Form, Input, TimePicker, message } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../Redux/features/alertSlice";
function ApplyDoctor() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const handelfinish = async (e) => {
    console.log(e);
    const startTime = e.timing[0].format("HH:mm");
    const endTime = e.timing[1].format("HH:mm");
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/apply-doctor",
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
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
    return false;
  };
  return (
    <LayOut>
      <h1 className="text-center">Apply Doctor</h1>
      <Form
        layout="vertical"
        onFinish={handelfinish}
        className="m-3 display-flex"
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
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </LayOut>
  );
}

export default ApplyDoctor;
