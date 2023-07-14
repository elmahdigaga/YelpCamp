const Joi = require("../../utils/html-sanitizer");

const reviewSchema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    body: Joi.string().required(),
});

function validateReview(req, res, next) {
    const { id } = req.params;
    const { rating, body } = req.body;

    const { error } = reviewSchema.validate({ rating, body });
    if (error) {
        req.flash("error", error.message);
        return res.status(400).redirect(`/campgrounds/${id}`);
    }

    next();
}

module.exports = { validateReview };
