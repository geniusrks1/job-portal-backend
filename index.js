const express=require('express');
const app=express();
const mongoose=require('mongoose');
const fs=require('fs');

const dotenv=require('dotenv');
const { incomingReqLogger } = require('./middleware/index');
dotenv.config();


app.use(incomingReqLogger);
app.use(express.json());
app.use('/api/v1', require('./routes/index'));
app.use('/api/v1/user',require('./routes/user'));
app.use('/api/v1/job',require('./routes/job'));

app.get('/',(req,res)=>{
    res.send("hello world!");
});


app.listen(process.env.PORT,()=>{
    console.log('server is runnig on port ',process.env.PORT);
    mongoose.connect(process.env.MONGOOSE_URI_STRING)
    .then(()=>console.log('connection is successful'))
    .catch(err=>console.log("error while connecting db", err))
})