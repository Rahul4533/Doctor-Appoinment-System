const mongoose = require("mongoose");

const apponimentSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
  doctorInfo: {
    type: Object,
    required:true
  },
  userInfo: {
    type: Object,
    required: true
  },
  date:{
    type: String,
    reqquired:true
  },
  status:{
    type:String,
    required:true,
    default:"pending"
  },
  time:{
    type:String,
    required:true
  }
},{ timestamps: true });

const appoinmentModel=mongoose.model('appoinment',apponimentSchema);

module.exports=appoinmentModel;
