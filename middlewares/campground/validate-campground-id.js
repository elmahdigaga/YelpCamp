const mongoose = require("mongoose");

function validateCampgroundId(req, res, next) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        req.flash("error", "Invalid Campground ID!");
        return res.status(400).redirect("/campgrounds");
    }
    next();
}

module.exports = { validateCampgroundId };
