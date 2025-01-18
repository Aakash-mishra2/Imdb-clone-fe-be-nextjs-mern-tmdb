import mongoose from "mongoose";

const producerSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    profile_path: { type: String, required: false },
});

const Producer = mongoose.model('Producer', producerSchema);