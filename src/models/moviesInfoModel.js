import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const moviesSchema = new mongoose.Schema({
  rank: { type: Number },
  title: { type: String },
  description: { type: String },
  image: { type: String },
  big_image: { type: String },
  genre: [],
  thumbnail: { type: String },
  rating: { type: String },
  id: { type: String },
  year: { type: Number },
  imdbid: { type: String },
  imdb_link: { type: String },
});

module.exports =
  mongoose.models.movies || mongoose.model("movies", moviesSchema);
