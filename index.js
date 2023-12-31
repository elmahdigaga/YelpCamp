// Packages
const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

// Only require .env constants when in dev env
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Routes
const campgroundsRouter = require("./routes/campground");
const reviewsRouter = require("./routes/review");
const authRouter = require("./routes/auth");

// Config
const { connectDatabase } = require("./config/database");
const sessionOptions = require("./config/session-options");
const cspDirectives = require("./config/csp-directives");

// Models
const User = require("./models/user");

// Require middlewares
const { errorHandler } = require("./middlewares/error-handler");
const { localsSetter } = require("./middlewares/locals-setter");

const app = express();
const port = process.env.PORT || 3000;

// Parsing middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// Security middlewares
app.use(helmet({ contentSecurityPolicy: { directives: cspDirectives } }));
// Session middlewares
app.use(session(sessionOptions));
app.use(flash());
// Auth middlewares
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(localsSetter);
// Sanitizing middlewares
app.use(mongoSanitize());

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

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
