const Notice = require("../models/Notice.Models");

exports.createNotice = async (req, res) => {
    try {
        const { title, description, date, category } = req.body;
        if (!title || !description || !date || !category) {
            return res.status(400).json({ status: "N", error: "All Feilds are is required!" });
        }
        const newNotice = new Notice({ title, description, date, category });
        await newNotice.save();
        return res.status(201).json({ status: "Y", message: "Notice created successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "N",
            error: `Internal Server Error: ${error}`,
        });
    }
};

exports.getNotice = async (req, res) => {
    try {
        const notice = await Notice.find();
        if (!notice || notice.length === 0) {
            return res.status(200).json({
                status: "Y",
                message: "No Data Found!",
                data: [],
            });
        }
        return res.status(200).json({
            status: "Y",
            message: "Success",
            data: notice,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "N",
            error: `Internal Server Error: ${error.message}`,
        });

    }

};

exports.deleteNotice = async (req, res) => {
    let id = req.params.id;
    try {
        const notice = await Notice.findByIdAndDelete(id);
        if (!notice) {
            return res.status(400).json({ status: "N", message: "Notice not found!" })
        }
        return res.status(200).json({ status: "Y", message: "Notice deleted successfully", })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "N",
            error: `Internal Server Error: ${error.message}`,
        });

    }
};

exports.updateNotice = async (req, res) => {
    const id = req.params.id;
    try {
        
        const { title, description, date, category } = req.body;
        // Validation
        if (!title || !description || !date || !category) {
            return res.status(400).json({
                status: "N",
                error: "All fields are required!",
            });
        }
        // Check notice
        const notice = await Notice.findById(id);
        if (!notice) {
            return res.status(400).json({
                status: "N",
                message: "Notice not found!"
            });
        }
        // Update notice
        const updatedNotice = await Notice.findByIdAndUpdate(id, { title, description, date, category }, { new: true, runValidators: true, });
        return res.status(200).json({
            status: "Y",
            message: "Notice updated successfully",
            data: updatedNotice,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: "N",
            error: `Internal Server Error: ${error.message}`,
        });
    }
}

