import dayjs from 'dayjs';
import axios from 'axios'
import Movie from "../models/MovieModel.js";
import Actor from "../models/actorModel.js";
import Producer from "../models/producerModel.js";

const apiKey = process.env.TMDB_API_KEY;

//Getting all movies with pagination
export const getAllMovies = async (req, res) => {
    const { search, pageNo } = req.query;
    const user = req.user;
    let result;
    try {
        if (search.length === 0) {
            const response = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=${pageNo}&sort_by=popularity.desc&api_key=${apiKey}`
            );
            result = response.data;

            const existingMovies = await Movie.find({ userId: user._id });
            result.results = [...existingMovies, ...response.data.results];

            res.status(200).json(result);
        }

        else {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search)}&include_adult=true&language=en-US&page=${pageNo}&api_key=${apiKey}`
            );
            result = response.data;
            res.status(200).json(result);
        }
    } catch (error) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
};

//Getting a single movie by its id
export const getSingleMovie = async (req, res) => {
    const { movieId } = req.params;
    try {
        let response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=casts&language=en-US&api_key=${apiKey}`
        );

        //refactring casts array because unessessary casts are coming
        const newResponse = response.data;
        let releventCasts = newResponse?.casts?.cast;
        const { casts, ...resWithoutCredits } = newResponse;

        let finalResponse = { ...resWithoutCredits, casts: releventCasts };

        return res.status(200).json(finalResponse);
    } catch (error) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
};

export const getMovieDetails = async (req, res) => {
    const { movieId } = req.params;
    try {
        const response = await Movie.findById(movieId)
            .populate('casts')
            .populate('producer');

        res.status(200).json(response);
    }
    catch (error) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
}

export const addNewMovie = async (req, res) => {
    const { original_title, selectedActors, selectedProducer, summary } = req.body;
    const user = req.user;
    const relDate = dayjs(new Date()).format('YYYY-MM-DD');

    let actorIds = [];
    let producerId = "";

    try {
        //Process actors
        for (const actor of selectedActors) {
            let existingActor = await Actor.findOne({ imdbId: actor.imdbId });
            if (existingActor) actorIds.push(existingActor._id);
            else {
                let newActor = new Actor({ ...actor, movies: [] });
                newActor.save();
                actorIds.push(newActor._id);
            }
        }

        //Process producer
        let existingProducer = await Producer.findOne({ imdbId: selectedProducer.imdbId });

        if (existingProducer) producerId = existingProducer._id;
        else {
            let newProducer = new Producer({ ...selectedProducer, movies: [] });
            await newProducer.save();
            producerId = newProducer._id;
        }

        const newMovie = {
            title: original_title,
            original_title,
            poster_path: process.env.DEFAULT_MOVIE_POSTER,
            casts: actorIds,
            producer: producerId,
            overview: summary,
            userId: user._id,
            status: "released",
            genres: [
                {
                    id: 28,
                    name: "Action"
                },
                {
                    id: 878,
                    name: "Science Fiction"
                },
                {
                    id: 35,
                    name: "Comedy"
                },
                {
                    id: 10751,
                    name: "Family"
                }
            ],
            release_date: relDate,
        };

        const movie = new Movie(newMovie);
        await movie.save();

        // Update the movies array for actors after movie creation
        for (const actorId of actorIds) {
            await Actor.findByIdAndUpdate(
                actorId,
                { $addToSet: { movies: movie._id } }); // Add movie reference if not already present
        }
        await Producer.findByIdAndUpdate(
            producerId,
            { $addToSet: { movies: movie._id } }
        );

        res.status(200).json({ msg: "New movie added" });
    }
    catch (error) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
};
