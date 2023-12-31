// Packages
const express = require("express");

// Controllers
const review = require("../controllers/review");

// Middlewares
const { validateReview } = require("../middlewares/validation/validate-review");
const {
    validateCampgroundId,
    validateReviewId,
} = require("../middlewares/validation/validate-id");
const { isLoggedIn } = require("../middlewares/auth/is-logged-in");
const { isReviewAuthor } = require("../middlewares/auth/is-review-author");

// Helpers
const { catchAsyncErr } = require("../utils/catch-async-err");

const router = express.Router({ mergeParams: true });

// DELETE
router.delete(
    "/:reviewId",
    isLoggedIn,
    validateCampgroundId,
    validateReviewId,
    isReviewAuthor,
    catchAsyncErr(review.remove)
);

// POST
router.post(
    "/",
    isLoggedIn,
    validateCampgroundId,
    validateReview,
    catchAsyncErr(review.create)
);

module.exports = router;
