const DoctorAcc = require('../models/doctorAccModel');
const Clinic = require('../models/clinicModel'); // Make sure this is the correct path

// CREATE - Register a new doctor
exports.registerDoctor = async (req, res) => {
    const {
        fullname,
        clinic_id,
        specialization,
        email,
        password,
        address,
        availability,
        contact
    } = req.body;

    try {
        // Validate required fields
        const requiredFields = { fullname, clinic_id, specialization, email, password };
        const missingFields = Object.entries(requiredFields)
            .filter(([_, value]) => !value)
            .map(([key]) => key);

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Check for existing email
        const existing = await DoctorAcc.findOne({ email: email.toLowerCase().trim() });
        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Generate profile picture URL
        const profilePicture = `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`;

        // Create doctor
        const doctor = await DoctorAcc.create({
            fullname: fullname.trim(),
            clinic_id,
            specialization: specialization.trim(),
            profilePicture,
            email: email.toLowerCase().trim(),
            password,
            address: address || '',
            availability: Array.isArray(availability) ? availability : [],
            contact: contact || ''
        });

        res.status(201).json({
            success: true,
            data: {
                _id: doctor._id,
                fullname: doctor.fullname,
                specialization: doctor.specialization,
                clinic_id: doctor.clinic_id,
                email: doctor.email,
                address: doctor.address,
                availability: doctor.availability,
                contact: doctor.contact,
                profilePicture: doctor.profilePicture
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
        const doctors = await DoctorAcc.find().select('-password');
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
                specialization: doctor.specialization,
                email: doctor.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, error: "Login failed." });
    }
};

// READ - Get doctors by clinic ID
exports.getDoctorsByClinic = async (req, res) => {
  try {
    const clinicId = req.params.clinicId; // Retrieve the clinicId from URL parameter

    // Check if clinic exists
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) {
      return res.status(404).json({ error: "Clinic not found" });
    }

    // Find doctors by clinic_id (ensure the value is properly cast to ObjectId)
    const doctors = await Doctor.find({ clinic_id: clinicId }); // Ensures correct casting

    if (doctors.length === 0) {
      return res.status(404).json({ error: "No doctors available for this clinic." });
    }

    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors by clinic:", error);
    res.status(500).json({ error: error.message });
  }
};