const express = require("express");
const mongoose = require("mongoose");
const { Campground } = require("../models/campground");
const { handleErrors } = require("../utils/helpers");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.get(
    "/",
    handleErrors(async (req, res) => {
        const campgrounds = await Campground.find();

        if (campgrounds.length === 0) {
            res.status(404).render("errors/not-found", {
                error: "No Campgrounds Found",
            });
        }

        res.status(200).render("campgrounds/all", { campgrounds });
    })
);

router.get(
    "/create",
    handleErrors((req, res) => {
        res.status(200).render("campgrounds/create");
    })
);

router.get(
    "/:id",
    handleErrors(async (req, res) => {
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
    })
);

router.post(
    "/",
    handleErrors(async (req, res) => {
        const { name, price, description, location } = req.body;

        const campground = await Campground.create({
            name,
            price,
            description,
            location,
        });

        res.status(201).redirect("/campgrounds");
    })
);

router.delete(
    "/:id",
    handleErrors(async (req, res) => {
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
    })
);

router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render("errors/internal-server", {
        error: "Internal Server Error",
    });
});

module.exports = router;
