import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bookmark_type: { type: String, require: true },
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },

}, { timestamps: true, })

const BookmarkModel = mongoose.model('Bookmark', BookmarkSchema);

export default BookmarkModel
