const express = require("express");
const { Campground } = require("../models/campground");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const campgrounds = await Campground.find();

        if (campgrounds.length === 0) {
            res.status(404).json({ error: "No Campgrounds Found" });
        }

        res.status(200).json({ campgrounds });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
