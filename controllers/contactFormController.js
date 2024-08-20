const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const ContactForms = require("../models/contactFormModel");

/**
 * @swagger
 * tags:
 *   name: ContactForms
 *   description: API for managing contact forms
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ContactForm:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
 *           description: The auto-generated ID of the contact form
 *           example: 1
 *         contactPurpose:
 *           type: string
 *           description: The purpose of the contact (e.g., General Inquiry, Support, Feedback)
 *           example: "Support"
 *         name:
 *           type: string
 *           description: The name of the person filling out the contact form
 *           example: "John Doe"
 *         email:
 *           type: string
 *           description: The email address of the person filling out the contact form
 *           example: "john.doe@example.com"
 *         phone:
 *           type: string
 *           description: The phone number of the person filling out the contact form
 *           example: "+1 123-456-7890"
 *         preferredContactMethod:
 *           type: string
 *           description: The preferred contact method (e.g., email, phone)
 *           example: "email"
 *         contactDays:
 *           type: string
 *           description: The preferred contact days (e.g., Monday, Tuesday, etc.)
 *           example: "Monday"
 *         message:
 *           type: string
 *           description: The message submitted in the contact form
 *           example: "I need help with my account."
 *         status:
 *           type: string
 *           description: The status of the contact form (e.g., pending, replied)
 *           example: "pending"
 *         replyMessage:
 *           type: string
 *           description: The reply message from the platform admin
 *           example: "Thank you for reaching out. We will get back to you shortly."
 */

/**
 * @swagger
 * /contactForms:
 *   get:
 *     summary: Get all contact forms
 *     tags: [ContactForms]
 *     responses:
 *       200:
 *         description: A list of contact forms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ContactForm'
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  try {
    const forms = await ContactForms.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /contactForms/{id}:
 *   get:
 *     summary: Get a contact form by ID
 *     tags: [ContactForms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The contact form id
 *     responses:
 *       200:
 *         description: A contact form by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactForm'
 *       404:
 *         description: Contact form not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10); // Convert id to a number
    const form = await ContactForms.findById(id);
    if (!form) {
      return res.status(404).json({ message: "Contact form not found" });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
