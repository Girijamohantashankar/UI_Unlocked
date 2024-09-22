const express = require("express");
const {signup} = require("../controllers/authController");
const router = express.Router();

// API->Signup
router.post("/signup", signup);





module.exports = router;