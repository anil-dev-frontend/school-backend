const express = require("express");
const router = express.Router();
const {createContact,getContacts,deleteContact,updateContact} = require("../controllers/contact.controller")

router.post("/", createContact);

router.get("/", getContacts);

router.delete("/:id", deleteContact);

router.put("/:id", updateContact);

module.exports = router;