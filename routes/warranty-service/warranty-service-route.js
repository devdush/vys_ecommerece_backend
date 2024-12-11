const express = require("express");
const { postWarrantyService, getWarranty } = require("../../controllers/warranty-service/warranty-service-controller");

const router = express.Router();

router.post("/add", postWarrantyService);
// router.get("/get/:id", getBrand);

 router.get("/get", getWarranty);

module.exports = router;
