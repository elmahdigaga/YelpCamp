const mongoose = require("mongoose");
const { Schema } = mongoose;

const campgroundSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    date_modified: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

const Campground = mongoose.model("Campground", campgroundSchema);

module.exports = { Campground };
