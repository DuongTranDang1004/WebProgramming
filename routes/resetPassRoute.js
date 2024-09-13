const express = require("express");
const router = express.Router();
const { resetPass } = require("../controllers/resetPassConstroller")

router.post("/", resetPass)

module.exports = router;