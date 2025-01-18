import mongoose from "mongoose";

// Relationships
// Movie can have multiple actors
// Actor can act in multiple movies
// Movie has only one producer
// Producer can produce multiple movies
const actorSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    imdbId: { type: Number, required: true },
    name: { type: String, required: true },
    profile_path: { type: String, required: false },
    movies: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Movie' }]
});

const Actor = mongoose.model('Actor', actorSchema);
export default Actor