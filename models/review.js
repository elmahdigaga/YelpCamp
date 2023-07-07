const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: [true, "Rating is required"],
    },
    body: {
        type: String,
        required: [true, "Review body is required"],
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
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
