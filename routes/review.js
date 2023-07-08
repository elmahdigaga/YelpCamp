const express = require("express");
const Review = require("../models/review");
const Campground = require("../models/campground");
const { handleErrors } = require("../utils/helpers");
const { validateReview } = require("../middlewares/validation/validate-review");
const {
    validateCampgroundId,
    validateReviewId,
} = require("../middlewares/validation/validate-id");
const { isLoggedIn } = require("../middlewares/auth/is-logged-in");
const { isReviewAuthor } = require("../middlewares/auth/is-review-author");

const router = express.Router({ mergeParams: true });

// Create a review
router.post(
    "/",
    isLoggedIn,
    validateCampgroundId,
    validateReview,
    handleErrors(async (req, res) => {
        const { id } = req.params;

        const campground = await Campground.findOne({ _id: id });
        if (!campground) {
            req.flash("error", "Campground Not Found!");
            res.status(404).redirect("/campgrounds");
        }

        const { rating, body } = req.body;
        const author = req.user._id;
        const review = new Review({ rating, body, author });

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
    isLoggedIn,
    validateCampgroundId,
    validateReviewId,
    isReviewAuthor,
    handleErrors(async (req, res) => {
        const { id, reviewId } = req.params;

        const campground = await Campground.findOneAndUpdate(
            { _id: id },
            { $pull: { reviews: reviewId } }
        );
        if (!campground) {
            req.flash("error", "Campground Not Found!");
            res.status(404).redirect("/campgrounds");
        }

        const review = await Review.findOneAndDelete({ _id: reviewId });

        req.flash("success", "Review deleted successfully!");
        res.status(200).redirect(`/campgrounds/${id}`);
    })
);

module.exports = router;
