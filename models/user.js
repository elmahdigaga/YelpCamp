const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
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

const User = mongoose.model("User", userSchema);

module.exports = User;
