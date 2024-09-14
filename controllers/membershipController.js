const Membership = require("../models/membershipModel");
const Instructor = require("../models/instructorModel");

/**
 * @swagger
 * tags:
 *   name: Memberships
 *   description: API for managing memberships for instructors
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Membership:
 *       type: object
 *       required:
 *         - instructorId
 *         - planName
 *         - planType
 *         - commissionFee
 *         - price
 *         - startDate
 *         - endDate
 *         - paymentMethod
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the membership
 *         instructorId:
 *           type: string
 *           description: The ID of the instructor associated with the membership
 *         planName:
 *           type: string
 *           description: The name of the membership plan
 *         planType:
 *           type: string
 *           enum: ['Monthly', 'Yearly']
 *           description: The type of the membership plan
 *         commissionFee:
 *           type: number
 *           description: The commission fee for the membership
 *         price:
 *           type: number
 *           description: The price of the membership plan
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the membership
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the membership
 *         paymentMethod:
 *           type: string
 *           enum: ['Card', 'PayPal']
 *           description: The payment method used for the membership
 *         cardNumber:
 *           type: string
 *           description: The card number if paymentMethod is 'Card'
 *       example:
 *         _id: 60d0fe4f5311236168a109ca
 *         instructorId: 60d0fe4f5311236168a109cb
 *         planName: "Pro Plan"
 *         planType: "Yearly"
 *         commissionFee: 10.00
 *         price: 200.00
 *         startDate: "2024-01-01"
 *         endDate: "2025-01-01"
 *         paymentMethod: "Card"
 *         cardNumber: "1234-5678-9012-3456"
 */


//Create 
/**
 * @swagger
 * /memberships:
 *   post:
 *     summary: Create a new membership
 *     tags: [Memberships]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Membership'
 *     responses:
 *       200:
 *         description: Membership created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 *       500:
 *         description: Internal server error
 */
const createMembership = async (req,res) => {
    try{
        console.log(req.body)
        const membership = await Membership.create(req.body);
        const instructor = await Instructor.findById(req.body.instructorId);
        instructor.membershipId = membership._id;
        await instructor.save();
        res.status(200).json(membership);
    }catch (error){
    res.status(500).json({message: error.message})
    }
}

//Get membership by instructorId
/**
 * @swagger
 * /memberships/{id}:
 *   get:
 *     summary: Retrieve a membership by ID
 *     tags: [Memberships]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Membership details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 *       404:
 *         description: Membership not found
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /memberships/instructor/{id}:
 *   get:
 *     summary: Retrieve memberships by instructor ID
 *     tags: [Memberships]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of memberships for the instructor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Membership'
 *       404:
 *         description: No memberships found for this instructor
 *       500:
 *         description: Internal server error
 */
const getMembershipsByInstructorID = async (req,res) => {
    try{
        const {id} = req.params;
        const memberships = await Membership.find({instructorId: id});
        if (memberships.length > 0) {
            return res.status(200).json(memberships);
        }else {
            return res.status(200).json({ message: "This account is not a membership" });
        }
    }catch(error){
        res.status(500).json({ message: error.message})
    }
}

module.exports = {
    createMembership,
    getMembershipsByInstructorID
}