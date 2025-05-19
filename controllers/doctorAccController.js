const DoctorAcc = require('../models/doctorAccModel');

exports.registerDoctor = async (req, res) => {
    const { fullname, specialization, email, password } = req.body;
    if (!req.body || !req.body.password || !req.body.email || !req.body.fullname || !req.body.specialization) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const existing = await DoctorAcc.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Doctor already exists" });
        }

        const doctor = await DoctorAcc.create({
            fullname,
            specialization,
            email,
            password
        });
        
        res.status(201).json({
            _id: doctor._id,
            fullname: doctor.fullname,
            specialization: doctor.specialization,
            email: doctor.email
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message }); // Fixed 'err' to 'error'
    }
};

exports.loginDoctor = async (req, res) => {
    const { email, password } = req.body;
    try {
        const doctor = await DoctorAcc.findOne({ email });
        if (!doctor) {
            return res.status(400).json({ message: "Doctor not found" });
        }
        
        const isMatch = await doctor.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            _id: doctor._id,
            fullname: doctor.fullname,
            specialization: doctor.specialization,
            email: doctor.email,

        });
        
    } catch (error) {
        res.status(500).json({ error: error.message }); // Fixed 'err' to 'error'
    }
};

