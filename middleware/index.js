const fs=require('fs');

 const incomingReqLogger=(req,res,next)=>{
    fs.appendFileSync('log.txt', `req method is ${req.method} req url ${req.url} ${new Date().toString()} \n` )
    next();
}

module.exports={incomingReqLogger};