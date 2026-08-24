const Gallery = require("../models/Gallery.Models");

exports.createGallery = async (req, res) => {
    try {
        const { title, imagesUrl, date } = req.body;
        if (!title || !imagesUrl || !date) {
            return res.status(400).json({ status: "N", error: "All Feilds are is required!" });
        }
        const newGallery = new Gallery({ title, imagesUrl, date });
        await newGallery.save();
        return res.status(201).json({ status: "Y", message: "Gallery created successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "N",
            error: `Internal Server Error: ${error}`,
        });
    }
};

exports.getGallery = async (req, res) => {
    try {
        const gallery = await Gallery.find();
        if (!gallery || gallery.length === 0) {
            return res.status(200).json({
                status: "Y",
                message: "No Data Found!",
                data: [],
            });
        }
        return res.status(200).json({
            status: "Y",
            message: "Success",
            data: gallery,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "N",
            error: `Internal Server Error: ${error.message}`,
        });

    }

};

exports.deleteGallery = async (req, res) => {
    let id = req.params.id;
    try {
        const gallery = await Gallery.findByIdAndDelete(id);
        if (!gallery) {
            return res.status(400).json({ status: "N", message: "Gallery not found!" })
        }
        return res.status(200).json({ status: "Y", message: "Gallery deleted successfully", })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "N",
            error: `Internal Server Error: ${error.message}`,
        });

    }
};

exports.updateGallery = async (req, res) => {
    const id = req.params.id;
    try {
        const { title, imagesUrl, date } = req.body;
        // Validation
        if (!title || !imagesUrl || !date) {
            return res.status(400).json({
                status: "N",
                error: "All fields are required!",
            });
        }
        // Check gallery
        const gallery = await Gallery.findById(id);
        if (!gallery) {
            return res.status(400).json({
                status: "N",
                message: "Gallery not found!"
            });
        }
        // Update gallery
        const updatedGallery = await Gallery.findByIdAndUpdate(id, { title, imagesUrl, date }, { new: true, runValidators: true, });
        return res.status(200).json({
            status: "Y",
            message: "Gallery updated successfully",
            data: updatedGallery,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: "N",
            error: `Internal Server Error: ${error.message}`,
        });
    }
}

