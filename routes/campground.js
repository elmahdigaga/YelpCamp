const express = require("express");
const mongoose = require("mongoose");
const Campground = require("../models/campground");
const { handleErrors } = require("../utils/helpers");
const { validateCampground } = require("../middlewares/validate-campground");

const router = express.Router();

// Get all campgrounds
router.get(
    "/",
    handleErrors(async (req, res) => {
        const campgrounds = await Campground.find();

        if (campgrounds.length === 0) {
            res.status(404).render("error", {
                error: "No Campgrounds Found",
            });
        }

        res.status(200).render("campgrounds/all", { campgrounds });
    })
);

// GET campground Creation view
router.get("/create", (req, res) => {
    res.status(200).render("campgrounds/create");
});

// GET campground Edit/Update view
router.get(
    "/:id/edit",
    handleErrors(async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).render("error", {
                error: "Invalid Campground ID",
            });
        }

        const campground = await Campground.findOne({ _id: id });
        if (!campground) {
            res.status(404).render("error", {
                error: "Campground Not Found",
            });
        }

        res.status(200).render("campgrounds/edit", { campground });
    })
);

// Get campground details by id
router.get(
    "/:id",
    handleErrors(async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).render("error", {
                error: "Invalid Campground ID",
            });
        }

        const campground = await Campground.findOne({ _id: id }).populate(
            "reviews"
        );
        if (!campground) {
            res.status(404).render("error", {
                error: "Campground Not Found",
            });
        }

        res.status(200).render("campgrounds/details", { campground });
    })
);

// Create a campground
router.post(
    "/",
    validateCampground,
    handleErrors(async (req, res) => {
        const { name, image, price, description, location } = req.body;

        const campground = await Campground.create({
            name,
            image,
            price,
            description,
            location,
        });

        res.status(201).render("campgrounds/details", { campground });
    })
);

// Update a campground
router.patch(
    "/:id",
    validateCampground,
    handleErrors(async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).render("error", {
                error: "Invalid Campground ID",
            });
        }

        const { name, image, price, description, location } = req.body;

        const campground = await Campground.findOneAndUpdate(
            { _id: id },
            {
                name,
                image,
                price,
                description,
                location,
            }
        );
        if (!campground) {
            res.status(404).render("error", {
                error: "Campground Not Found",
            });
        }

        res.status(200).redirect(`/campgrounds/${id}`);
    })
);

// Delete a campground
router.delete(
    "/:id",
    handleErrors(async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).render("error", {
                error: "Invalid Campground ID",
            });
        }

        const campground = await Campground.findOneAndDelete({ _id: id });
        if (!campground) {
            res.status(404).render("error", {
                error: "Campground Not Found",
            });
        }

        res.status(200).redirect("/campgrounds");
    })
);

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render("error", {
        error: err,
    });
});

module.exports = router;
