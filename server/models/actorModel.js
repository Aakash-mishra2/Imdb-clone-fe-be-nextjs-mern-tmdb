import mongoose from "mongoose";

const actorSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    profile_path: { type: String, required: false },
});

const Actor = mongoose.model('Actor', actorSchema);