const express = require("express");
const router = express.Router();
const {createTeacher,getTeacher,deleteTeacher,updateTeacher} = require("../controllers/teacher.controller")

router.post("/", createTeacher);

router.get("/", getTeacher);

router.delete("/:id", deleteTeacher);

router.put("/:id", updateTeacher);

module.exports = router;