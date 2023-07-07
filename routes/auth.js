const express = require("express");
const User = require("../models/user");
const { handleErrors } = require("../utils/helpers");

const router = express.Router();

router.get("/register", (req, res) => {
    res.status(200).render("auth/register");
});

router.get("/login", (req, res) => {
    res.status(200).render("auth/login");
});

module.exports = router;
