import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    category_id: {
        type: String,
        required: true, // null 여부

    },
    type: {
        type: String,
        required: true, // null 여부

    },
    status: {
        type: String,
        required: true, // null 여부

    },
    start_time: {
        type: Date,
        default: Date.now, // 기본값
    },
    end_time: {
        type: Date,
    },
    contents: {
        type: String,
        required: true, // null 여부

    },
    etag: {
        type: String,
        required: true, // null 여부

    },
    have_repost: {
        type: String,
        required: true, // null 여부

    }
});
module.exports = mongoose.model('Notes', notesSchema);