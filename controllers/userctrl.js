const userModel = require("../models/usermodel");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctormodel = require("../models/doctormodel");
const appoinmentModel = require("../models/apponimentmodel");
const moment = require("moment");


//register Controller
const registerctrl = async (req, res) => {
  const { name, email, password, conformpass } = req.body;
  if (password.toLowerCase() === conformpass.toLowerCase()) {
    try {
      const existuser = await userModel.findOne({ email: email });

      if (existuser) {
        return res
          .status(200)
          .send({ message: "user alraedy exist", success: true });
      }
      const salt = await bycript.genSalt(10);
      const hashpass = await bycript.hash(password, salt);

      const user = await userModel.create({
        name: name,
        email: email,
        password: hashpass,
      });

      res
        .status(201)
        .send({ message: "user created successflly", success: true });
    } catch (error) {}
  } else {
    res.status(201).send({ message: "password-mismatch", success: false });
  }
};

//Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }

    const ismatch = await bycript.compare(password, user.password);

    if (!ismatch) {
      return res
        .status(200)
        .send({ message: "Invlid email or password", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    res
      .status(200)
      .send({ message: "WELCOME", success: true, token, name: user.name });
  } catch (error) {
    console.log(error);
  }
};

//Auth controller

const authcontroller = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        user: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

//Apply doctor Controller

const applydoctorctrl = async (req, res) => {
  try {
    const newDoctor = await doctormodel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminuser = await userModel.findOne({ isAdmin: true });
    const notification = adminuser.notification;
    notification.push({
      type: "apply-docotor-request",
      message: `${newDoctor.firstname} ${newDoctor.lastname} has apply for doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstname + "" + newDoctor.lastname,
        onClickpath: "/admin/doctors",
      },
    });

    await userModel.findByIdAndUpdate(adminuser._id, { notification });

    res.status(201).send({
      success: true,
      message: "Doctor Account applyed Success",
    });
  } catch (error) {
    console.log(err);
    res.status(500).send({
      success: false,
      error,
      message: "error while apply for doctor",
    });
  }
};

//getAllNotification controller

const getAllNotification = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    //user.seennotification=notification;
    const updateuser = await user.save();

    res.status(201).send({
      success: true,
      message: "all notification readed",
      data: updateuser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in notification",
      error,
    });
  }
};

const deleteallnotifications = async (req, res) => {
  const { userId } = req.body;
  try {
    const deleteuser = await userModel.findById(userId);
    if (deleteuser) {
      deleteuser.seennotification = [];
      await deleteuser.save();

      res.status(201).send({
        success: true,
        message: "Delete All Notification",
        data: deleteuser,
      });
    } else {
      res.status(201).send({
        success: false,
        message: "Deletation failed",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error while Delete Notification" });
  }
};

const getalldoctorctrl = async (req, res) => {
  try {
    const doctor = await doctormodel.find({ status: "approved" });

    if (doctor) {
      res.status(200).send({
        success: true,
        message: "All Doctors List",
        doctor,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "NO Doctor Found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const bookappoinmentctrl = async (req, res) => {
  try {
    req.body.status = "pending";
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    const newAppoinment = new appoinmentModel(req.body);
    await newAppoinment.save();
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New appoinment Request",
      message: `A new Appoinment Request From ${req.body.userInfo.name}`,
      onClickpath: "/user/appoinment",
    });

    await user.save();

    res.status(200).send({
      success: true,
      message: "Appoinment Book successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

//booking-avibility controller

const bookingAvibilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromtime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();

    const doctorId = req.body.doctorId;

    const appoinment = await appoinmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromtime,
        $lte: toTime,
      },
    });

    if (appoinment.length > 0) {
      res.status(200).send({
        success: true,
        message: "Appoinment not avilable at this time",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Slot Available Book-Now",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, mesage: "internal server error" });
  }
};


const userAppoinmentctrl=async(req,res)=>{
try {
  const user=await appoinmentModel.find({userId:req.body.userId});

  if(user){
     res.status(200).send({
      success:true,
      message: "Appoinment Fetch Success",
      appoinment:user
     })

  }else{

    res.status(404).send({success:false,
    message:"User not found"})
  }

  
} catch (error) {
  console.log(error)

  res.status(500).send({
    success:false,
    message:"Internal server Error"
  })
  
}

}
module.exports = {
  registerctrl,
  login,
  authcontroller,
  applydoctorctrl,
  getAllNotification,
  deleteallnotifications,
  getalldoctorctrl,
  bookappoinmentctrl,
  bookingAvibilityController,
  userAppoinmentctrl
};
