const Joi = require("../../utils/html-sanitizer");

const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().escapeHTML(),
    password: Joi.string().min(4).alphanum().required().escapeHTML(),
    email: Joi.string().email().escapeHTML(),
});

function validateUser(req, res, next) {
    const { email, username, password } = req.body;

    const { error } = userSchema.validate({
        email,
        username,
        password,
    });
    if (error) {
        req.flash("error", error.message);
        return res.status(400).redirect("/auth/register");
    }

    next();
}

module.exports = { validateUser };
