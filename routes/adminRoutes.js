const express=require('express');
const authmiddleware = require('../middleware/authmiddleware');
const { getallusers, getalldoctors, statusctrl } = require('../controllers/adminctrl');

const router=express.Router();


router.get('/getallusers',authmiddleware,getallusers);

router.get('/getalldoctors',authmiddleware,getalldoctors);

router.post('/status-approved',authmiddleware,statusctrl);
module.exports=router;