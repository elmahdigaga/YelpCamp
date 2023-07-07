const express = require("express");
const Campground = require("../models/campground");
const { handleErrors } = require("../utils/helpers");
const {
    validateCampground,
} = require("../middlewares/campground/validate-campground");
const {
    validateCampgroundId,
} = require("../middlewares/campground/validate-campground-id");
const { isLoggedIn } = require("../middlewares/auth/is-logged-in");

const router = express.Router();

// Get all campgrounds
router.get(
    "/",
    handleErrors(async (req, res) => {
        const campgrounds = await Campground.find();

        if (campgrounds.length === 0) {
            req.flash("error", "No Campgrounds Found!");
            res.status(404).redirect("/");
        }

        res.status(200).render("campgrounds/all", { campgrounds });
    })
);

// GET campground Creation view
router.get("/create", isLoggedIn, (req, res) => {
    res.status(200).render("campgrounds/create");
});

// GET campground Edit/Update view
router.get(
    "/:id/edit",
    isLoggedIn,
    validateCampgroundId,
    handleErrors(async (req, res) => {
        const { id } = req.params;

        const campground = await Campground.findOne({ _id: id });
        if (!campground) {
            req.flash("error", "Campground Not Found!");
            res.status(404).redirect("/campgrounds");
        }

        res.status(200).render("campgrounds/edit", { campground });
    })
);

// Get campground details by id
router.get(
    "/:id",
    validateCampgroundId,
    handleErrors(async (req, res) => {
        const { id } = req.params;

        const campground = await Campground.findOne({ _id: id }).populate(
            "reviews"
        );
        if (!campground) {
            req.flash("error", "Campground Not Found!");
            res.status(404).redirect("/campgrounds");
        }

        res.status(200).render("campgrounds/details", { campground });
    })
);

// Create a campground
router.post(
    "/",
    isLoggedIn,
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

        req.flash("success", "Campground created successfully!");
        res.status(200).redirect(`/campgrounds/${campground._id}`);
    })
);

// Update a campground
router.patch(
    "/:id",
    isLoggedIn,
    validateCampgroundId,
    validateCampground,
    handleErrors(async (req, res) => {
        const { id } = req.params;
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
            req.flash("error", "Campground Not Found!");
            res.status(404).redirect("/campgrounds");
        }

        req.flash("success", "Campground updated successfully!");
        res.status(200).redirect(`/campgrounds/${id}`);
    })
);

// Delete a campground
router.delete(
    "/:id",
    isLoggedIn,
    validateCampgroundId,
    handleErrors(async (req, res) => {
        const { id } = req.params;

        const campground = await Campground.findOneAndDelete({ _id: id });
        if (!campground) {
            req.flash("error", "Campground Not Found!");
            res.status(404).redirect("/campgrounds");
        }

        req.flash("success", "Campground deleted successfully!");
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
