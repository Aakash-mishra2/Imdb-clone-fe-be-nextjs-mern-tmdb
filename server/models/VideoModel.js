import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({

    videoId:{ type: Number, require: true},
    adult:{ type: Boolean, require: true},
    poster_path: { type: String, require: true},
    release_date: { type: String, require: true},
    title: { type: String ,require: true }

}, {timestamps: true,})

const VideoModel = mongoose.model('Video', VideoSchema);

export default VideoModel