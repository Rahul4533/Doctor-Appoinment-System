const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "first name is required"],
  },
  lastname: {
    type: String,
    required: [true, "last name is required"],
  },
  phone: {
    type: String,
    required: [true, "phone is required"]
  },
  email: {
    type: String,
    required: [true, "email is required"]
  },
  website:{
    type: String,
  },
  address: {
    type: String,
    required: [true, "address is required"]
  },
  specializations: {
    type: String,
    required: [true, "specializations is required"]
  },
  experiance: {
    type: String,
    required: [true, "experience is required"]
  },
  fees:{
    type:Number,
    required:[true,'feee is required']
  },
  status:{
    type: String,
    default:'pendng'
  },
  timing:{
    type:Object,
    required: [true,'timing is required']

  },

  userId:{
    type:String
  }

},{timestamps: true});

const doctormodel = mongoose.model("doctor", doctorSchema);

module.exports = doctormodel;
