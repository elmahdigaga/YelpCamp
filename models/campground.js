const mongoose = require("mongoose");
const { Schema } = mongoose;

const campgroundSchema = new Schema({
    name: {
        type: String,
        required: [true, "Campground name is required"],
    },
    image: {
        type: String,
        required: [true, "Campground image is required"],
    },
    price: {
        type: Number,
        required: [true, "Campground price is required"],
    },
    description: {
        type: String,
    },
    location: {
        type: String,
        required: [true, "Campground location is required"],
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
