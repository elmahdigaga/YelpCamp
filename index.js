const express = require("express");
require("dotenv").config();
const { connectDatabase } = require("./config/database");

const app = express();
const port = process.env.PORT || 3000;

connectDatabase();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
