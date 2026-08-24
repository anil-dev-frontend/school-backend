const express = require("express");
const router = express.Router();
const {createGallery,getGallery,deleteGallery,updateGallery} = require("../controllers/gallery.controller")

router.post("/", createGallery);

router.get("/", getGallery);

router.delete("/:id", deleteGallery);

router.put("/:id", updateGallery);

module.exports = router;