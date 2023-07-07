const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const { handleErrors } = require("../utils/helpers");

const router = express.Router();

router.get("/register", (req, res) => {
    res.status(200).render("auth/register");
});

router.get("/login", (req, res) => {
    res.status(200).render("auth/login");
});

router.post(
    "/register",
    handleErrors(async (req, res) => {
        try {
            const { email, username, password } = req.body;
            let user = new User({ email, username });
            user = await User.register(user, password);

            req.flash("success", "Welcome");
            res.status(400).redirect("/campgrounds");
        } catch (error) {
            req.flash("error", error.message);
            res.status(400).redirect("/auth/register");
        }
    })
);

router.post(
    "/login",
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/auth/login",
    }),
    (req, res) => {
        req.flash("success", "Welcome");
        res.status(200).redirect("/campgrounds");
    }
);

module.exports = router;
