const express = require("express");
const router = express.Router();
const { forgetPass } = require("../controllers/forgetPassController")

router.post("/", forgetPass)

module.exports = router