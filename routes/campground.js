// Packages
const express = require("express");
const { parser } = require("../config/cloudinary");

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
const { getGeometry } = require("../middlewares/get-geometry");

// Helpers
const { handleErrors } = require("../utils/handle-errors");

const router = express.Router();

// /create
router.get("/create", isLoggedIn, campground.renderCreate);

// /:id/edit
router.get(
    "/:id/edit",
    isLoggedIn,
    validateCampgroundId,
    isAuthor,
    handleErrors(campground.renderEdit)
);

// /:id
router
    .route("/:id")
    .get(validateCampgroundId, handleErrors(campground.renderDetails))
    .patch(
        isLoggedIn,
        validateCampgroundId,
        isAuthor,
        parser.array("image"),
        validateCampground,
        getGeometry,
        handleErrors(campground.update)
    )
    .delete(
        isLoggedIn,
        validateCampgroundId,
        isAuthor,
        handleErrors(campground.remove)
    );

// /
router
    .route("/")
    .get(handleErrors(campground.index))
    .post(
        isLoggedIn,
        parser.array("image"),
        validateCampground,
        getGeometry,
        handleErrors(campground.create)
    );

module.exports = router;
