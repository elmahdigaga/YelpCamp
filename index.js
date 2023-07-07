const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
require("dotenv").config();
const campgroundsRouter = require("./routes/campground");
const reviewsRouter = require("./routes/review");
const authRouter = require("./routes/auth");
const { connectDatabase } = require("./config/database");
const User = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

// Parsing middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Session middlewares
app.use(
    session({
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
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashSuccess = req.flash("success");
    res.locals.flashError = req.flash("error");
    next();
});

// Auth middlewares
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Configure server
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Connect to the database
connectDatabase();

// Routes
app.use("/campgrounds/:id/reviews", reviewsRouter);
app.use("/campgrounds", campgroundsRouter);
app.use("/auth", authRouter);

// Home route
app.get("/", (req, res) => {
    res.status(200).render("home");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
