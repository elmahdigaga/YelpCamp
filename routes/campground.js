// Packages
const express = require("express");
const path = require("path");
const multer = require("multer");

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
const upload = multer({ dest: path.join(__dirname, "../public/images") });

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
        validateCampground,
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
        /*validateCampground,*/ upload.single("image"),
        handleErrors(campground.create)
    );

module.exports = router;
