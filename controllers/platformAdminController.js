const express = require("express");
const router = express.Router();
const PlatformAdmin = require("../models/platformAdminModel");

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
router.get("/", async (req, res) => {
  try {
    const platformAdmins = await PlatformAdmin.getAllPlatformAdmins();
    res.json(platformAdmins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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
router.get("/:id", async (req, res) => {
  try {
    const platformAdmin = await PlatformAdmin.getPlatformAdminById(
      req.params.id
    );
    if (!platformAdmin) {
      return res.status(404).json({ message: "Platform admin not found" });
    }
    res.json(platformAdmin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
