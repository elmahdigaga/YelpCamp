const express = require("express");
const mongoose = require("mongoose");
const { Campground } = require("../models/campground");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const campgrounds = await Campground.find();

        if (campgrounds.length === 0) {
            res.status(404).render("errors/not-found", {
                error: "No Campgrounds Found",
            });
        }

        res.status(200).render("campgrounds/all", { campgrounds });
    } catch (error) {
        console.error(error);
        res.status(500).render("errors/internal-server", {
            error: "Internal Server Error",
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).render("errors/not-found", {
                error: "Campground Not Found",
            });
        }

        const campground = await Campground.findOne({ _id: id });
        if (!campground) {
            res.status(404).render("errors/not-found", {
                error: "Campground Not Found",
            });
        }

        res.status(200).json({ campground });
    } catch (error) {
        console.error(error);
        res.status(500).render("errors/internal-server", {
            error: "Internal Server Error",
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).render("errors/not-found", {
                error: "Campground Not Found",
            });
        }

        const campground = await Campground.findOneAndDelete({ _id: id });
        if (!campground) {
            res.status(404).render("errors/not-found", {
                error: "Campground Not Found",
            });
        }

        res.status(200).json({ campground });
    } catch (error) {
        console.error(error);
        res.status(500).render("errors/internal-server", {
            error: "Internal Server Error",
        });
    }
});

module.exports = router;
