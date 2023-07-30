const Contact = require("../models/contactModel");

module.exports.createContact = async (req, res) => {
  try {
    const { email } = req.body;
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const contact = await Contact.create(req.body);
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({message: "Error creating contact"});
  }
};

module.exports.getContact = async (req, res) => {
    try {
        const contact = await Contact.find({});
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({message: "Error getting contact"});
    }
};


module.exports.getContactById = async(req,res) => {
    try {
        const {id} = req.params
        const contact = await Contact.findById(id);
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({message: "Error getting contact"});
    }
}


module.exports.updateContact = async(req,res) => {
    try {
            const {id} = req.params
            const contact = await Contact.findByIdAndUpdate(id, req.body);
            res.status(200).json(contact);
        } catch (error) {
            res.status(500).json({message: "Error updating contact"});
        }
}


module.exports.deleteContact = async(req,res) => {
    try {
        const {id} = req.params
        const contact = await Contact.findByIdAndDelete(id);
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({message: "Error deleting contact"});
    }
}