const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const { connectDatabase } = require("./config/database");
const campgroundsRouter = require("./routes/campground");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

connectDatabase();

app.use("/campgrounds", campgroundsRouter);

app.get("/", (req, res) => {
    res.render("home");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
