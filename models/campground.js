const mongoose = require("mongoose");
const { Schema } = mongoose;

const campgroundSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    image: {
        type: String,
        required: [true, "Image URL is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    description: {
        type: String,
    },
    location: {
        type: String,
        required: [true, "Location is required"],
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
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

const Campground = mongoose.model("Campground", campgroundSchema);

module.exports = { Campground };
