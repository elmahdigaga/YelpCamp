const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Campground = require("./campground");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
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

// The plugin automatically adds the username, salt and hash fields in the schema, aswell as other methods
userSchema.plugin(passportLocalMongoose);

// Adding a post middleware to delete associated campgrounds when a user is deleted
userSchema.post("findOneAndDelete", async function (user) {
    try {
        const campgrounds = await Campground.find({ author: user._id });
        if (campgrounds.length > 0) {
            for (let campground of campgrounds) {
                await Campground.findOneAndDelete({ _id: campground._id });
            }
        }
    } catch (error) {
        console.error(error);
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
