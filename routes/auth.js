// Packages
const express = require("express");
const passport = require("passport");

// Controllers
const auth = require("../controllers/auth");

// Middlewares
const { isLoggedIn } = require("../middlewares/auth/is-logged-in");
const { storeReturnTo } = require("../middlewares/auth/store-return-to");
const { handleErrors } = require("../utils/helpers");
const { validateUser } = require("../middlewares/validation/validate-user");

const router = express.Router();

// GET
router.get("/register", auth.renderRegister);
router.get("/login", auth.renderLogin);
router.get("/logout", isLoggedIn, auth.logout);

// POST
router.post("/register", validateUser, handleErrors(auth.register));
router.post(
    "/login",
    storeReturnTo,
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/auth/login",
    }),
    auth.login
);

module.exports = router;
