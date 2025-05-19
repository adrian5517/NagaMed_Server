const DoctorAcc = require('../models/doctorAccModel');

exports.registerDoctor = async (req, res) => {
    const { fullname, specialization, email, password, username } = req.body;
    
    try {
        // Input validation with specific error messages
        const requiredFields = { fullname, specialization, email, password, username };
        const missingFields = Object.entries(requiredFields)
            .filter(([_, value]) => !value)
            .map(([key]) => key);
            
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                message: `Missing required fields: ${missingFields.join(', ')}` 
            });
        }

        // Email format validation
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
        res.status(500).json({ 
            success: false,
            error: "Registration failed. Please try again." 
        });
    }
};

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
            return res.status(401).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }
        
        const isMatch = await doctor.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid credentials" 
            });
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
        res.status(500).json({ 
            success: false,
            error: "Login failed. Please try again." 
        });
    }
};