const mongoose = require("mongoose");
const { Review } = require("../models/review");
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
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
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

// Adding a post middleware to delete associated reviews when a campground is deleted
campgroundSchema.post("findOneAndDelete", async function (campground) {
    try {
        if (campground.reviews.length) {
            await Review.deleteMany({ _id: { $in: campground.reviews } });
        }
    } catch (error) {
        console.error(error);
    }
});

const Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
