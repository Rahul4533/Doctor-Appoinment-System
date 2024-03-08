const express=require('express');
const { registerctrl, login, authcontroller, applydoctorctrl, getAllNotification, deleteallnotifications, getalldoctorctrl, bookappoinmentctrl, bookingAvibilityController, userAppoinmentctrl } = require('../controllers/userctrl');
const authmiddleware = require('../middleware/authmiddleware');

const router=express.Router();

router.post('/register',registerctrl);
router.post('/login',login);
 
router.post('/getuserdata',authmiddleware,authcontroller);

router.post('/apply-doctor',authmiddleware,applydoctorctrl);


router.post('/get-all-notification',authmiddleware,getAllNotification);

router.post('/delete-all-notification',authmiddleware,deleteallnotifications);

router.get('/getalldoctor',authmiddleware,getalldoctorctrl);    

router.post('/book-appoinment',authmiddleware,bookappoinmentctrl);

router.post('/check-avibility',authmiddleware,bookingAvibilityController);

router.get('/userappoinment',authmiddleware,userAppoinmentctrl);

module.exports=router;
