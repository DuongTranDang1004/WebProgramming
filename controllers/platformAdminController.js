const PlatformAdmins = require("../models/platformAdminModel");

/**
 * @swagger
 * tags:
 *   name: PlatformAdmins
 *   description: API for managing platform admins
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PlatformAdmin:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
 *           description: The auto-generated ID of the platform admin
 *           example: 1
 *         email:
 *           type: string
 *           description: The email of the platform admin
 *           example: "admin@example.com"
 *         password:
 *           type: string
 *           description: The hashed password of the platform admin
 *           example: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Pz7dp62ptDXY1dRg/IXHy"
 *         profilePicture:
 *           type: string
 *           description: The URL of the platform admin's profile picture
 *           example: "https://example.com/images/admin-profile.jpg"
 *         firstName:
 *           type: string
 *           description: The first name of the platform admin
 *           example: "John"
 *         lastName:
 *           type: string
 *           description: The last name of the platform admin
 *           example: "Doe"
 *         address:
 *           type: string
 *           description: The street address of the platform admin
 *           example: "789 Maple St"
 *         city:
 *           type: string
 *           description: The city of the platform admin
 *           example: "Anytown"
 *         zipcode:
 *           type: string
 *           description: The postal/zip code of the platform admin
 *           example: "98765"
 *         country:
 *           type: string
 *           description: The country code of the platform admin
 *           example: "US"
 *         phone:
 *           type: string
 *           description: The phone number of the platform admin
 *           example: "+1 555-555-5555"
 */

/**
 * @swagger
 * /platformAdmins:
 *   get:
 *     summary: Get all platform admins
 *     tags: [PlatformAdmins]
 *     responses:
 *       200:
 *         description: A list of platform admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlatformAdmin'
 *       500:
 *         description: Internal server error
 */
// Get all platform admins
const getPlatformAdmins = async (req, res) => {
  try {
    const admins = await PlatformAdmins.find({});
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /platformAdmins/{id}:
 *   get:
 *     summary: Get a platform admin by ID
 *     tags: [PlatformAdmins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The platform admin ID
 *     responses:
 *       200:
 *         description: A platform admin by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlatformAdmin'
 *       404:
 *         description: Platform admin not found
 *       500:
 *         description: Internal server error
 */
// Get platform admin by ID
const getPlatformAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await PlatformAdmins.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Platform admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /platformAdmins:
 *   post:
 *     summary: Create a new platform admin
 *     tags: [PlatformAdmins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlatformAdmin'
 *     responses:
 *       201:
 *         description: The created platform admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlatformAdmin'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
// Create a new platform admin
const createPlatformAdmin = async (req, res) => {
  try {
    const platformAdmin = new PlatformAdmins(req.body);
    await platformAdmin.save();
    res.status(201).json(platformAdmin);
  } catch (error) {
    res.status(400).json({ message: 'An error occurred while creating the platform admin', error });
  }
};

/**
 * @swagger
 * /platformAdmins/{id}:
 *   put:
 *     summary: Update a platform admin by ID
 *     tags: [PlatformAdmins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The platform admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlatformAdmin'
 *     responses:
 *       200:
 *         description: The updated platform admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlatformAdmin'
 *       404:
 *         description: Platform admin not found
 *       500:
 *         description: Internal server error
 */
// Update platform admin by ID
const updatePlatformAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedAdmin = await PlatformAdmins.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAdmin) {
      return res.status(404).json({ message: "Platform admin not found" });
    }
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /platformAdmins/{id}:
 *   delete:
 *     summary: Delete a platform admin by ID
 *     tags: [PlatformAdmins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The platform admin ID
 *     responses:
 *       204:
 *         description: No content, admin deleted successfully
 *       404:
 *         description: Platform admin not found
 *       500:
 *         description: Internal server error
 */
// Delete platform admin by ID
const deletePlatformAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedAdmin = await PlatformAdmins.findByIdAndDelete(id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Platform admin not found" });
    }
    res.status(204).json({ message: "Platform admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPlatformAdmins,
  getPlatformAdmin,
  createPlatformAdmin,
  updatePlatformAdmin,
  deletePlatformAdmin,
};
