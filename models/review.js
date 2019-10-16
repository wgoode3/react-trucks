const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be 2 characters or longer"]
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"]
    },
    comment: {
        type: String,
        required: [true, "Comment is required"],
        minlength: [10, "Comment must be 10 characters or longer"]
    }
}, {timestamps:true});

module.exports = ReviewSchema;