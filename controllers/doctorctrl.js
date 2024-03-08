
const appoinmentModel = require("../models/apponimentmodel");
const doctormodel = require("../models/doctormodel");
const userModel=require('../models/usermodel');

const DoctorInfo = async (req, res) => {
  const { userId } = req.body;

  try {
    const doctor = await doctormodel.findOne({ userId });

    if (doctor) {
      res.status(200).send({
        success: true,
        message: "Doctor Profile Fetch",
        doctor: doctor,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Doctor Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};


const updatedoctorctrl=async(req,res)=>{

  try {

    const doctor=await doctormodel.findOneAndUpdate({userId:req.body.userId},req.body)

    if(doctor){
      res.status(200).send({
        success:true,
        message:"Doctor Profile Updated",
        doctor
      })
    }else{
      res.status(404).send({success:false,
      message:"doctor not found"})
    }

    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Internal Server Error",
      error
    })
    
  }

}


const getDoctorById = async(req,res) => {
  try {

    const doctor=await doctormodel.findOne({_id:req.body.doctorId});
     if(doctor){
      res.status(200).send(
        {
          success:true,
          message:"Doctor Fetch By Id",
          data:doctor
        }
      )
     }else{

     res.status(404).send({
      success:false,
      message:'doctor Not Found By id'
     })
    }
    
  } catch (error) {

    console.log(error);
    res.status(500).send({ 
      success:false,
      message:"something went wrong",
      
    })
    
  }
}

const doctorAppoinmentctrl=async(req,res)=>{

  try {

    const doctor=await doctormodel.find({userId:req.body.userId})
    const appoinment=await appoinmentModel.find(doctor._id)
    if(appoinment){
      res.status(200).send({
        success:true,
        message:"Doctor Appoinment fetch successfully",
        data:appoinment
      })
    }else{
      res.status(404).send({success:false,
      message:" No Appoinment found"})
    }
     
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error in doc appoinment"
    })
    
  }


}


const ApprovedStatus=async(req,res)=>{
 const{appoinmentId,status}=req.body;
  try {
       const appoinment =await appoinmentModel.findByIdAndUpdate(appoinmentId,{status});
       const user=await userModel.findOne({_id:appoinment.userId});
      user.notification.push({
        type:'status-updated',
        message: `Your Appoinment has been  ${status}`,
        onclickpath:'/doctor-appoinment'
      })
  await user.save();

  if(user){
    res.status(200).send({
      success:true,
      message:"Status Updated"
    })
  }

      
  
  
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Internal server error',
      error
    })
    
  }

}


module.exports = { DoctorInfo,updatedoctorctrl ,getDoctorById,doctorAppoinmentctrl,ApprovedStatus};
