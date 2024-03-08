const express = require("express");
const authmiddleware = require("../middleware/authmiddleware");
const {
  DoctorInfo,
  updatedoctorctrl,
  getDoctorById,
  doctorAppoinmentctrl,
  ApprovedStatus,
} = require("../controllers/doctorctrl");

const router = express.Router();

router.post("/getdoctorsInfo", authmiddleware, DoctorInfo);

router.post("/update-doctor-profile", authmiddleware, updatedoctorctrl);

router.post("/getDoctorById", authmiddleware, getDoctorById);

router.get("/doctor-Appoinment", authmiddleware, doctorAppoinmentctrl);

router.post("/change-Status", authmiddleware, ApprovedStatus);

module.exports = router;
