const express = require("express");
const mongoose = require("mongoose");
const Review = require("../models/review");
const Campground = require("../models/campground");
const { handleErrors } = require("../utils/helpers");
const { validateReview } = require("../middlewares/validate-review");

const router = express.Router({ mergeParams: true });

// Create a review
router.post(
    "/",
    validateReview,
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

        const { rating, body } = req.body;
        const review = new Review({ rating, body });

        campground.reviews.push(review);
        await review.save();
        await campground.save();

        req.flash("success", "Review created successfully!");
        res.status(201).redirect(`/campgrounds/${campground._id}`);
    })
);

// Delete a review
router.delete(
    "/:reviewId",
    handleErrors(async (req, res) => {
        const { id, reviewId } = req.params;
        if (
            !mongoose.Types.ObjectId.isValid(id) ||
            !mongoose.Types.ObjectId.isValid(reviewId)
        ) {
            res.status(400).render("error", {
                error: "Invalid ID",
            });
        }

        const campground = await Campground.findOneAndUpdate(
            { _id: id },
            { $pull: { reviews: reviewId } }
        );
        if (!campground) {
            res.status(404).render("error", {
                error: "Campground Not Found",
            });
        }

        const review = await Review.findOneAndDelete({ _id: reviewId });
        if (!review) {
            res.status(404).render("error", {
                error: "Review Not Found",
            });
        }

        req.flash("success", "Review deleted successfully!");
        res.status(200).redirect(`/campgrounds/${id}`);
    })
);

module.exports = router;
