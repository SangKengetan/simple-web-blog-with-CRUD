const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "category name is required"],
        },
        description: {
            type: String,
            required: [true, "description is required"],
        },
        createdBy: {
            type: ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);