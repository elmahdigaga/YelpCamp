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
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
