const Review = require("../models/review");

const create = async (req, res) => {
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
};

const remove = async (req, res) => {
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
};

module.exports = { create, remove };
