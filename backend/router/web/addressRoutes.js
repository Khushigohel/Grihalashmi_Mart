const express = require("express");
const Address = require("../../models/Address");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        //console.log("Incoming data:", req.body); 
        const { userId, fullName, phoneNumber, address, Pincode, City, State } = req.body;

        const newAddress = new Address({ userId, fullName, phoneNumber, address, Pincode, City, State });
        await newAddress.save();
        res.status(201).json({ message: "Address Saved Successfully", address: newAddress });
    } catch (err) {
        console.error("Backend error:", err); 
        res.status(500).json({ error: err.message });
    }
});
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const addresses = await Address.find({ userId });
        res.status(200).json({ addresses });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;