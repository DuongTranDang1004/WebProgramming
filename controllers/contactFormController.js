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
// Get all contact forms
const getContactForms = async (req, res) => {
  try {
    const forms = await ContactForms.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
 *         description: The contact form ID
 *     responses:
 *       200:
 *         description: A contact form by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactForm'
 *       404:
 *         description: Contact form not found
 *       500:
 *         description: Internal server error
 */
// Get contact form by ID
const getContactForm = async (req, res) => {
  try {
    const id = req.params.id;
    const form = await ContactForms.findById(id);
    if (!form) {
      return res.status(404).json({ message: "Contact form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /contactForms:
 *   post:
 *     summary: Create a new contact form
 *     tags: [ContactForms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactForm'
 *     responses:
 *       201:
 *         description: The created contact form
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactForm'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
// Create a new contact form
const createContactForm = async (req, res) => {
  try {
    const contactForm = new ContactForms(req.body);
    await contactForm.save();
    res.status(201).json(contactForm);
  } catch (error) {
    res.status(400).json({ message: 'An error occurred while creating the contact form', error });
  }
};

/**
 * @swagger
 * /contactForms/{id}:
 *   put:
 *     summary: Update a contact form by ID
 *     tags: [ContactForms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The contact form ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactForm'
 *     responses:
 *       200:
 *         description: The updated contact form
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactForm'
 *       404:
 *         description: Contact form not found
 *       500:
 *         description: Internal server error
 */
// Update contact form by ID
const updateContactForm = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedForm = await ContactForms.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedForm) {
      return res.status(404).json({ message: "Contact form not found" });
    }
    res.status(200).json(updatedForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /contactForms/{id}:
 *   delete:
 *     summary: Delete a contact form by ID
 *     tags: [ContactForms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The contact form ID
 *     responses:
 *       204:
 *         description: No content, form deleted successfully
 *       404:
 *         description: Contact form not found
 *       500:
 *         description: Internal server error
 */
// Delete contact form by ID
const deleteContactForm = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedForm = await ContactForms.findByIdAndDelete(id);
    if (!deletedForm) {
      return res.status(404).json({ message: "Contact form not found" });
    }
    res.status(204).json({ message: "Contact form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getContactForms,
  getContactForm,
  createContactForm,
  updateContactForm,
  deleteContactForm,
};
