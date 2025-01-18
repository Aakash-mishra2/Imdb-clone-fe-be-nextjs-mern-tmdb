import mongoose from 'mongoose';
const genreSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
})

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  original_title: { type: String, required: false },
  overview: { type: String, required: false },
  casts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
  producer: { type: mongoose.Schema.Types.ObjectId, ref: 'Producer' },
  poster_path: { type: String, required: false },
  release_date: { type: Date, required: false },
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: false },
  video: { type: Boolean, default: false },
  original_language: { type: String, default: 'en', required: false },
  genres: { type: [genreSchema], required: false },
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie