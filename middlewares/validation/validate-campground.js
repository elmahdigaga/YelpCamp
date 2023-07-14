const Joi = require("../../utils/html-sanitizer");

const campgroundSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().escapeHTML(),
    price: Joi.number().min(0).required(),
    description: Joi.string().min(3).required().escapeHTML(),
    location: Joi.string().required().escapeHTML(),
});

function validateCampground(req, res, next) {
    const { name, price, description, location } = req.body;

    const { error } = campgroundSchema.validate({
        name,
        price,
        description,
        location,
    });
    if (error) {
        req.flash("error", error.message);
        const redirectUrl =
            req.originalUrl === "/campgrounds"
                ? "/campgrounds/create"
                : `${req.originalUrl.substring(
                      0,
                      req.originalUrl.indexOf("?")
                  )}/edit`;
        return res.status(400).redirect(redirectUrl);
    }

    next();
}

module.exports = { validateCampground };
