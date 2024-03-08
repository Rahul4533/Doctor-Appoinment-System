const doctormodel = require("../models/doctormodel");
const userModel = require("../models/usermodel");

const getallusers = async (req, res) => {
  try {
    userModel.find({}).then((users) => {
      if (users.length === 0) {
        res.status(200).send({
          success: false,
          message: "User not found",
        });
      } else {
        res.status(200).send({
          success: true,
          message: "All Users",
          Users: users,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const getalldoctors = async (req, res) => {
  try {
    doctormodel.find({}).then((doctors) => {
      if (doctors.length === 0) {
        res.status(200).send({
          success: false,
          message: "doctor not found",
        });
      } else {
        res
          .status(200)
          .send({
            success: true,
            message: "Fetch All Doctors",
            Doctors: doctors,
          });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const statusctrl = async (req, res) => {
  try {
   const {DoctorId,status,userId}=req.body;
     
   const doctor=await doctormodel.findByIdAndUpdate(DoctorId,{status});
   await doctor.save();
   const user=await userModel.findOne({_id:doctor.userId});
   
  
   const notification=user?.notification;
      notification.push(
        {
          type:'doctor-account-request-updated',
          message:`your doctor request account is ${status}`,
          onClickPath:'/notification'
        }
      )
      
      user.isDoctor=status==='approved'?true:false;
     
      await user.save(); 

      res.status(200).send({
        success:true,
        message:"Account status changed",
        data:doctor
      })

   

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Errror while Changing status",
      error,
    });
  }
};

module.exports = { getalldoctors, getallusers, statusctrl };
