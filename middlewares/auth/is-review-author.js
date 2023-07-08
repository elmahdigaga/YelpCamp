const Review = require("../../models/review");

async function isReviewAuthor(req, res, next) {
    try {
        const { id, reviewId } = req.params;

        const review = await Review.findOne({ _id: reviewId });
        if (!review) {
            req.flash("error", "Review Not Found!");
            return res.status(404).redirect(`/campgrounds/${id}`);
        }

        if (!review.author.equals(req.user._id)) {
            req.flash("error", "Not authorized");
            return res.status(403).redirect(`/campgrounds/${id}`);
        }

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = { isReviewAuthor };
