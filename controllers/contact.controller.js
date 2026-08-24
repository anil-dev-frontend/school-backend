const Contact = require("../models/Contact.Models");


// Create Contact
exports.createContact = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        // Validation
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({
                status: "N",
                error: "All fields are required",
            });
        }
        // Create contact
        const newContact = new Contact({ name, email, phone, subject, message });
        await newContact.save();
        return res.status(201).json({ status: "Y", message: "Contact created successfully" })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "N",
            error: `Internal Server Error: ${error}`,
        });
    }

};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    if (!contacts || contacts.length === 0) {
      return res.status(200).json({
        status: "Y",
        message: "No Data Found!",
        data: [],
      });
    }

    return res.status(200).json({
      status: "Y",
      message: "Success",
      data: contacts,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`,
    });
  }
};

exports.deleteContact = async (req,res) =>{
    let id = req.params.id;
    try{
        const contact = await Contact.findByIdAndDelete(id);
        if(!contact){
            return res.status(404).json({
            status: "N",
            message: "Contact not found",
        });
        }
         return res.status(200).json({
        status: "Y",
        message: "Contact deleted successfully",
        });

    }catch(error){
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`,
    });
    }

};

exports.updateContact = async (req, res) => {
  const id = req.params.id;

  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        status: "N",
        message: "All fields are required",
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        subject,
        message,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!contact) {
      return res.status(404).json({
        status: "N",
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      status: "Y",
      message: "Contact updated successfully",
      data: contact,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`,
    });
  }
};