const Joi = require("joi");

const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(4).alphanum().required(),
    email: Joi.string().email(),
});

function validateUser(req, res, next) {
    const { email, username, password } = req.body;

    const { error } = userSchema.validate({
        email,
        username,
        password,
    });
    if (error) {
        throw new Error(error);
    }

    next();
}

module.exports = { validateUser };
