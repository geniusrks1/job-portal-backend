const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const { Job } = require('../schema/job.schema');
const { authMiddleware } = require('../middleware/auth');

router.post('/create', authMiddleware, async (req, res) => {
    try {
        const { name, logo, position, salary, jobType, remote, location, description, about, skills, information } = req.body;

      
        const job = new Job({ name, logo, position, salary, 
            jobType, remote, location, description, about,
             skills, information,created: req.user });
        await job.save();

        res.status(201).json({ message: "Job created successfully" });
    } catch (err) {
        console.error(err);  // Log the error for more details
        res.status(400).json({ message: "Job not created", error: err.message });
    }
});


router.get('/', async (req, res) => {
    try {
        // Use select to exclude '_id', '_creator', and '__v'
        const jobs = await Job.find().select("-_id -created -__v");
        
        res.status(200).json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching jobs", error: err.message });
    }
});

module.exports = router;
