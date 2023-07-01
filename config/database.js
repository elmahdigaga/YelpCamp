const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DATABASE_URL;

async function connectDatabase() {
    try {
        await mongoose.connect(url);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

module.exports = { connectDatabase };
