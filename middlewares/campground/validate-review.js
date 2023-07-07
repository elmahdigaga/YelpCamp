const Joi = require("joi");

const reviewSchema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    body: Joi.string().required(),
});

function validateReview(req, res, next) {
    const { rating, body } = req.body;

    const { error } = reviewSchema.validate({ rating, body });
    if (error) {
        throw new Error(error);
    }

    next();
}

module.exports = { validateReview };
