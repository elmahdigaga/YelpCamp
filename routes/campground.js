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

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Invalid Campground ID" });
        }

        const campground = await Campground.findOne({ _id: id });
        if (!campground) {
            return res.status(404).json({ error: "Campground Not Found" });
        }

        res.status(200).json({ campground });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
