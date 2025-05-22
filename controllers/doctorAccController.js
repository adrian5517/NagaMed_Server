const DoctorAcc = require('../models/doctorAccModel');
const Clinic = require('../models/clinicModel'); // Make sure this is the correct path

// CREATE - Register a new doctor
exports.registerDoctor = async (req, res) => {
    try {
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

        // Step 1: Check for missing required fields
        const requiredFields = { fullname, clinic_id, specialization, email, password };
        const missingFields = Object.entries(requiredFields)
            .filter(([_, value]) => !value?.toString().trim())
            .map(([key]) => key);

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Step 2: Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const normalizedEmail = email.toLowerCase().trim();

        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Step 3: Check for existing email
        const existingDoctor = await DoctorAcc.findOne({ email: normalizedEmail });
        if (existingDoctor) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // Step 4: Generate profile picture URL
        const profilePicture = `https://api.dicebear.com/7.x/avataaars/svg?seed=${normalizedEmail}`;

        // Step 5: Create and save the doctor
        const newDoctor = await DoctorAcc.create({
            fullname: fullname.trim(),
            clinic_id,
            specialization: specialization.trim(),
            email: normalizedEmail,
            password: password.trim(),
            address: address?.trim() || '',
            availability: Array.isArray(availability) ? availability : [],
            contact: contact?.trim() || '',
            profilePicture
        });

        // Step 6: Respond with created doctor data (excluding password)
        res.status(201).json({
            success: true,
            data: {
                _id: newDoctor._id,
                fullname: newDoctor.fullname,
                specialization: newDoctor.specialization,
                clinic_id: newDoctor.clinic_id,
                email: newDoctor.email,
                address: newDoctor.address,
                availability: newDoctor.availability,
                contact: newDoctor.contact,
                profilePicture: newDoctor.profilePicture
            }
        });

    } catch (error) {
        console.error('Doctor registration failed:', error);
        res.status(500).json({ success: false, error: "Internal server error during registration." });
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
    const clinicId = req.params.id;

    // Validate format of ObjectId
    if (!mongoose.Types.ObjectId.isValid(clinicId)) {
      return res.status(400).json({ error: 'Invalid clinic ID format' });
    }

    // Optional: check if the clinic exists
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) {
      return res.status(404).json({ error: 'Clinic not found' });
    }

    // Find doctors with matching ObjectId
    const doctors = await Doctor.find({ clinic_id: mongoose.Types.ObjectId(clinicId) });

    if (doctors.length === 0) {
      return res.status(404).json({ error: 'No doctors available for this clinic.' });
    }

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};