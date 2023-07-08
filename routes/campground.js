// Packages
const express = require("express");

// Controllers
const campground = require("../controllers/campground");

// Middlewares
const {
    validateCampground,
} = require("../middlewares/validation/validate-campground");
const {
    validateCampgroundId,
} = require("../middlewares/validation/validate-id");
const { isLoggedIn } = require("../middlewares/auth/is-logged-in");
const { isAuthor } = require("../middlewares/auth/is-author");

// Helpers
const { handleErrors } = require("../utils/helpers");

const router = express.Router();

// GET
router.get("/", handleErrors(campground.index));
router.get("/create", isLoggedIn, campground.renderCreate);
router.get(
    "/:id/edit",
    isLoggedIn,
    validateCampgroundId,
    isAuthor,
    handleErrors(campground.renderEdit)
);
router.get(
    "/:id",
    validateCampgroundId,
    handleErrors(campground.renderDetails)
);

// POST
router.post(
    "/",
    isLoggedIn,
    validateCampground,
    handleErrors(campground.create)
);

// PATCH
router.patch(
    "/:id",
    isLoggedIn,
    validateCampgroundId,
    isAuthor,
    validateCampground,
    handleErrors(campground.update)
);

// DELETE
router.delete(
    "/:id",
    isLoggedIn,
    validateCampgroundId,
    isAuthor,
    handleErrors(campground.remove)
);

module.exports = router;
