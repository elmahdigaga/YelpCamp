const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const expressSession = require("express-session");
const methodOverride = require("method-override");
const campgroundsRouter = require("./routes/campground");
const reviewsRouter = require("./routes/review");
const { connectDatabase } = require("./config/database");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
    expressSession({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            expires: Date.now() + 1000 * 60 * 60 * 24 * 2,
            maxAge: 1000 * 60 * 60 * 24 * 2, // Two days
        },
    })
);
app.use(express.static(path.join(__dirname, "public")));

// Configure server
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Connect to the database
connectDatabase();

// Routes
app.use("/campgrounds/:id/reviews", reviewsRouter);
app.use("/campgrounds", campgroundsRouter);

// Home route
app.get("/", (req, res) => {
    res.status(200).render("home");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
