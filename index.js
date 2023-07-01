const express = require("express");
require("dotenv").config();
const path = require("path");
const { connectDatabase } = require("./config/database");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

connectDatabase();

app.get("/", (req, res) => {
    res.render("home");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
