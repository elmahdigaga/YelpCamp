const mongoose = require("mongoose");

function validateCampgroundId(req, res, next) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        req.flash("error", "Invalid Campground ID!");
        return res.status(400).redirect("/campgrounds");
    }
    next();
}

function validateReviewId(req, res, next) {
    const { reviewId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        req.flash("error", "Invalid Review ID!");
        return res.status(400).redirect("/campgrounds");
    }
    next();
}

function validateUserId(req, res, next) {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        req.flash("error", "Invalid User ID!");
        return res.status(400).redirect("/campgrounds");
    }
    next();
}

module.exports = { validateCampgroundId, validateReviewId, validateUserId };
