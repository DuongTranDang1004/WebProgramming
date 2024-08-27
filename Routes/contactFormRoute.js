const express = require("express");
const router = express.Router();
const {
  getContactForms,
  getContactForm,
  createContactForm,
  updateContactForm,
  deleteContactForm,
} = require("../controllers/contactFormController");

router.get("/", getContactForms);

router.get("/:id", getContactForm);

router.post("/", createContactForm);

router.put("/:id", updateContactForm);

router.delete("/:id", deleteContactForm);

module.exports = router;
