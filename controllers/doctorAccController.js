const DoctorAcc = require('../models/doctorAccModel');

// CREATE - Register a new doctor
exports.registerDoctor = async (req, res) => {
    const { fullname, specialization, email, password, username } = req.body;

    try {
        const requiredFields = { fullname, specialization, email, password, username };
        const missingFields = Object.entries(requiredFields)
            .filter(([_, value]) => !value)
            .map(([key]) => key);

        if (missingFields.length > 0) {
            return res.status(400).json({ 
                message: `Missing required fields: ${missingFields.join(', ')}` 
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existing = await DoctorAcc.findOne({ 
            $or: [{ email }, { username }] 
        });

        if (existing) {
            return res.status(400).json({ 
                message: existing.email === email 
                    ? "Email already exists" 
                    : "Username already taken"
            });
        }

        const doctor = await DoctorAcc.create({
            fullname: fullname.trim(),
            username: username.trim(),
            specialization: specialization.trim(),
            email: email.toLowerCase().trim(),
            password
        });

        res.status(201).json({
            success: true,
            data: {
                _id: doctor._id,
                fullname: doctor.fullname,
                username: doctor.username,
                specialization: doctor.specialization,
                email: doctor.email
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, error: "Registration failed." });
    }
};

// READ - Get all doctors
exports.getDoctors = async (req, res) => {
    try {
        const doctors = await DoctorAcc.find().select('-password'); // exclude password
        res.status(200).json({ success: true, data: doctors });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch doctors." });
    }
};

// READ - Get doctor by ID
exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await DoctorAcc.findById(req.params.id).select('-password');
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch doctor." });
    }
};

// UPDATE - Update doctor info
exports.updateDoctor = async (req, res) => {
    try {
        const updateFields = { ...req.body };
        if (updateFields.email) {
            updateFields.email = updateFields.email.toLowerCase().trim();
        }
        const doctor = await DoctorAcc.findByIdAndUpdate(req.params.id, updateFields, {
            new: true,
            runValidators: true
        }).select('-password');

        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to update doctor." });
    }
};

// DELETE - Delete doctor
exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await DoctorAcc.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        res.status(200).json({ success: true, message: "Doctor deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to delete doctor." });
    }
};

// LOGIN - Authenticate doctor
exports.loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "Email and password are required" 
            });
        }

        const doctor = await DoctorAcc.findOne({ email: email.toLowerCase().trim() });
        if (!doctor) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await doctor.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        res.status(200).json({
            success: true,
            data: {
                _id: doctor._id,
                fullname: doctor.fullname,
                username: doctor.username,
                specialization: doctor.specialization,
                email: doctor.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, error: "Login failed." });
    }
};
