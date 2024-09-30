const mongoose=require('mongoose');
// const {User} =require('./user.schema')

const jobSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true
    },
    logo: {
        type: 'String',
        required: true
    },
    position: {
        type: 'String',
        required: true
    },
    salary: {  
        type: 'Number',
        required: true
    },
    jobType: {
        type: "String",  
        required: true,
        enum: ["full-time", "internship", "part-time", "contract"]
    },
    remote: {
        type: "Boolean",
        required: true,
        default: false
    },
    location: { 
        type: "String",
        required: true
    },
    description: {
        type: "String",
        required: true
    },
    about: {
        type: "String",
        required: true
    },
    skills: {
        type: [String],  // Expect an array of strings
        required: true
    },
    information: {
        type: "String",
        required: true
    },
    created: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
});


const Job=mongoose.model("Job",jobSchema);
module.exports={Job};