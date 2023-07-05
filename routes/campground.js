const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const { Campground } = require("../models/campground");
const { handleErrors } = require("../utils/helpers");
const { validateCampground } = require("../middlewares/validate-campground");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(methodOverride("_method"));

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

router.get("/create", (req, res) => {
    res.status(200).render("campgrounds/create");
});

router.get(
    "/:id/edit",
    handleErrors(async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).render("error", {
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

router.get(
    "/:id",
    handleErrors(async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).render("error", {
                error: "Invalid Campground ID",
            });
        }

        const campground = await Campground.findOne({ _id: id });
        if (!campground) {
            res.status(404).render("error", {
                error: "Campground Not Found",
            });
        }

        res.status(200).render("campgrounds/details", { campground });
    })
);

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

router.patch(
    "/:id",
    validateCampground,
    handleErrors(async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).render("error", {
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

router.delete(
    "/:id",
    handleErrors(async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).render("error", {
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

router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render("error", {
        error: err,
    });
});

module.exports = router;
