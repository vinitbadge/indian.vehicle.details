const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();
const apiService = require("../services/api_service");



router.post("/get-vehicle-details", apiService.getVehicleDetails);
module.exports = router;
