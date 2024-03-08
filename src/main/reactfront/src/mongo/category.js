import mongoose from "mongoose";

const { Schema } = mongoose;
const categorySchema = new Schema({
    _id: {
      type: String,
    },
    categories: {
        key: {type: String},
        value: {type: String},
        required: true, // null 여부
    }
});
module.exports = mongoose.model('Category', categorySchema);