const express=require('express')
const colors=require('colors')
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const path=require('path');

//dotenv config

dotenv.config();
connectDB();


const app=express();



//middleware

app.use(express.json());
app.use(morgan('dev'));

//routes

app.use('/',require('./routes/userRouter'));
app.use('/admin',require('./routes/adminRoutes'))
app.use('/doctor',require('./routes/doctorRoutes'));

//listen server
 app.use(express.static(path.join(__dirname, '/client/build')));

 http.get('*',function(req,res){
const index=path.resolve(__dirname,'client','build','index.html');
   res.sendFile(index);
 })


app.listen(process.env.PORT,()=>{
    console.log(`Server is running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.white);
})