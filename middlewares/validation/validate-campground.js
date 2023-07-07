const Joi = require("joi");

const campgroundSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    image: Joi.string().required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().min(3).required(),
    location: Joi.string().required(),
});

function validateCampground(req, res, next) {
    const { name, image, price, description, location } = req.body;

    const { error } = campgroundSchema.validate({
        name,
        image,
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
