const User = require("../models/user");

const renderRegister = (req, res) => {
    res.status(200).render("auth/register");
};

const renderLogin = (req, res) => {
    res.status(200).render("auth/login");
};

const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        let user = new User({ email, username });
        user = await User.register(user, password);

        req.login(user, (err) => {
            if (err) {
                return next(err);
            }

            req.flash("success", "Welcome");
            res.status(400).redirect("/campgrounds");
        });
    } catch (error) {
        req.flash("error", error.message);
        res.status(400).redirect("/auth/register");
    }
};

const login = (req, res) => {
    req.flash("success", "Welcome");
    const redirectUrl = res.locals.returnTo || "/campgrounds";
    delete req.session.returnTo;
    res.status(200).redirect(redirectUrl);
};

const logout = (req, res) => {
    req.logOut((error) => {
        if (error) {
            return next(error);
        }

        req.flash("success", "Logged out successfully");
        res.status(200).redirect("/campgrounds");
    });
};

module.exports = { renderRegister, renderLogin, register, login, logout };
