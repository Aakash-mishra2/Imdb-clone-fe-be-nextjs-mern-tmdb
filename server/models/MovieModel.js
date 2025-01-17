import mongoose, { Schema } from 'mongoose';
const actorSchema = new Mongoose.Schema({
  name: { type: String, required: true },
  id: { type:String, required: true },
  profilePath: { type:String, required: true},
})
const MovieSchema = new Mongoose.Schema({
  movieId: { type: String, required: true},
  title: { type: String, required: true},
  actors: [{
    type: mongoose.Types.ObjectId,
    Schema: actorSchema,
    
  }]
})
