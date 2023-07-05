const express = require("express");
const mongoose = require("mongoose");
const { Campground } = require("../models/campground");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

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
        next(error);
    }
});

router.get("/create", (req, res) => {
    try {
        res.status(200).render("campgrounds/create");
    } catch (error) {
        next(error);
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

        res.status(200).render("campgrounds/details", { campground });
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, price, description, location } = req.body;

        const campground = await Campground.create({
            name,
            price,
            description,
            location,
        });

        res.status(201).redirect("/campgrounds");
    } catch (error) {
        next(error);
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

        res.status(200).redirect("/campgrounds");
    } catch (error) {
        next(error);
    }
});

router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render("errors/internal-server", {
        error: "Internal Server Error",
    });
});

module.exports = router;
