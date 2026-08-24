const Event = require("../models/Event.Models");


exports.createEvent = async (req,res) =>{
    try{
        const {title, description, shortDescription, date, location} = req.body;
        if(!title || !description || !shortDescription || !date || !location){
            return res.status(400).json({status:"N", error:"All Feilds are is required!"});
        }
        const newEvent = new Event({title, description, shortDescription, date, location});
        await newEvent.save();
        return res.status(201).json({ status: "Y", message: "Event created successfully" })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            status: "N",
            error: `Internal Server Error: ${error}`,
        });

    }

}
exports.getEvent = async (req, res) => {
      try {
        const events = await Event.find();
    
        if (!events || events.length === 0) {
          return res.status(200).json({
            status: "Y",
            message: "No Data Found!",
            data: [],
          });
        }
    
        return res.status(200).json({
          status: "Y",
          message: "Success",
          data: events,
        });
    
      } catch (error) {
        console.log(error);
    
        return res.status(500).json({
          status: "N",
          error: `Internal Server Error: ${error.message}`,
        });
      }
    };


    exports.deleteEvent = async (req,res) =>{
    let id = req.params.id;
    try{
        const event = await Event.findByIdAndDelete(id);
        if(!event){
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

exports.updateEvent = async (req, res) => {
  const id = req.params.id;

  try {
    const {title,description,shortDescription,date,location} = req.body;

    // Validation
    if (!title || !description || !shortDescription || !date || !location) {
      return res.status(400).json({
        status: "N",
        error: "All fields are required!",
      });
    }

    // Check event
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        status: "N",
        message: "Event not found",
      });
    }

    // Update event
    const updatedEvent = await Event.findByIdAndUpdate(id,{title,description,shortDescription,date,location,},
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      status: "Y",
      message: "Event updated successfully",
      data: updatedEvent,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`,
    });
  }
};