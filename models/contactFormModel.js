// models/ContactForms.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactFormsSchema = new Schema(
  {
    contactPurpose: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: false,
    },
    preferredContactMethod: {
      type: String,
      required: true,
      enum: ["email", "phone"], // Assuming the preferred contact method can be either 'email' or 'phone'
    },
    contactDays: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "replied"], // Assuming status can be either 'pending' or 'replied'
    },
    replyMessage: {
      type: String,
      required: false,
    },
  },
  { collection: "ContactForms" }
);

// Create a model using the schema
const ContactForms = mongoose.model("ContactForms", ContactFormsSchema);

module.exports = ContactForms;
