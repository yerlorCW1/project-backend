// controllers/adminController.js
const Admin = require("../models/admin");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

// controllers/adminController.js
exports.register = async (req, res) => {
  try {
    console.log('Register request body:', req.body); // Debug log
    const { email, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({ email, phoneNumber, password: hashedPassword });
    res.status(201).json({
      success: true,
      data: newAdmin,
      message: "Admin registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to register admin" });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ adminId: admin.adminId }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ success: true, token, message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
