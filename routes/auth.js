// Packages
const express = require("express");
const passport = require("passport");

// Controllers
const auth = require("../controllers/auth");

// Middlewares
const { isLoggedIn } = require("../middlewares/auth/is-logged-in");
const { storeReturnTo } = require("../middlewares/auth/store-return-to");
const { catchAsyncErr } = require("../utils/catch-async-err");
const { validateUser } = require("../middlewares/validation/validate-user");

const router = express.Router();

// /register
router
    .route("/register")
    .get(auth.renderRegister)
    .post(validateUser, catchAsyncErr(auth.register));

// /login
router
    .route("/login")
    .get(auth.renderLogin)
    .post(
        storeReturnTo,
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/auth/login",
        }),
        auth.login
    );

// /logout
router.get("/logout", isLoggedIn, auth.logout);

module.exports = router;
