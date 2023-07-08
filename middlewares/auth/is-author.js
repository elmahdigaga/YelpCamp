const Campground = require("../../models/campground");

async function isAuthor(req, res, next) {
    try {
        const { id } = req.params;

        const campground = await Campground.findOne({ _id: id });
        if (!campground) {
            req.flash("error", "Campground Not Found!");
            return res.status(404).redirect("/campgrounds");
        }

        if (!campground.author.equals(req.user._id)) {
            req.flash("error", "Not authorized");
            return res.status(403).redirect(`/campgrounds/${id}`);
        }

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = { isAuthor };
