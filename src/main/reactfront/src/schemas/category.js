import mongoose from "mongoose";

const { Schema } = mongoose;
const categorySchema = new Schema({
    categories: {
        type: String,
        required: true, // null 여부
    }
});
module.exports = mongoose.model('Category', categorySchema);