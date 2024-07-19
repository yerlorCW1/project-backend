// routes/admin.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// POST /admin/register
router.post("/register", adminController.register);

// POST /admin/login
router.post("/login", adminController.login);

module.exports = router;
