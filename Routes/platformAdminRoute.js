const express = require("express");
const router = express.Router();
const {
  getPlatformAdmins,
  getPlatformAdmin,
  createPlatformAdmin,
  updatePlatformAdmin,
  deletePlatformAdmin,
} = require("../controllers/platformAdminController");

router.get("/", getPlatformAdmins);

router.get("/:id", getPlatformAdmin);

router.post("/", createPlatformAdmin);

router.put("/:id", updatePlatformAdmin);

router.delete("/:id", deletePlatformAdmin);

module.exports = router;
