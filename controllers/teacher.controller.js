const Teacher = require("../models/Teacher.Models");

exports.createTeacher = async (req, res) => {
    try {
        const { name, subject, designation, bio, image } = req.body;
        if (!name || !subject || !designation || !bio || !image) {
            return res.status(400).json({ status: "N", error: "All Feilds are is required!" });
        }
        const newTeacher = new Teacher({ name, subject, designation, bio, image });
        await newTeacher.save();
        return res.status(201).json({ status: "Y", message: "Teacher created successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "N",
            error: `Internal Server Error: ${error}`,
        });
    }
};

exports.getTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.find();
        if (!teacher || teacher.length === 0) {
            return res.status(200).json({
                status: "Y",
                message: "No Data Found!",
                data: [],
            });
        }
        return res.status(200).json({
            status: "Y",
            message: "Success",
            data: teacher,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "N",
            error: `Internal Server Error: ${error.message}`,
        });

    }

};

exports.deleteTeacher = async (req, res) => {
    let id = req.params.id;
    try {
        const teacher = await Teacher.findByIdAndDelete(id);
        if (!teacher) {
            return res.status(400).json({ status: "N", message: "Teacher not found!" })
        }
        return res.status(200).json({ status: "Y", message: "Teacher deleted successfully", })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "N",
            error: `Internal Server Error: ${error.message}`,
        });

    }
};

exports.updateTeacher = async (req, res) => {
    const id = req.params.id;
    try {

        const { name, subject, designation, bio, image } = req.body;
        // Validation
        if (!name || !subject || !designation || !bio || !image) {
            return res.status(400).json({
                status: "N",
                error: "All fields are required!",
            });
        }
        // Check teacher
        const teacher = await Teacher.findById(id);
        if (!teacher) {
            return res.status(400).json({
                status: "N",
                message: "Teacher not found!"
            });
        }
        // Update teacher
        const updatedTeacher = await Teacher.findByIdAndUpdate(id, { name, subject, designation, bio, image }, { new: true, runValidators: true, });
        return res.status(200).json({
            status: "Y",
            message: "Teacher updated successfully",
            data: updatedTeacher,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: "N",
            error: `Internal Server Error: ${error.message}`,
        });
    }
}

