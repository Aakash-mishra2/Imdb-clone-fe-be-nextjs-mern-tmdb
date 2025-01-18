import axios from 'axios'
const apiKey = process.env.TMDB_API_KEY;
import Movie from "../models/MovieModel.js";
import dayjs from 'dayjs';

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

            const existingMovies = await Movie.find({ userId: user._id }).populate('actors');
            console.log('//', [...existingMovies, ...response.data.results]);

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
        //res.status(200).json(result);

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

        let finalResponse = { ...resWithoutCredits, casts: releventCasts }

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
        const response = await Movie.findById(movieId);

        console.log('response', response);
        res.status(200).json(response);
    }
    catch (err) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
}

export const addNewMovie = async (req, res) => {
    const { original_title, selectedActors, selectedProducers, summary } = req.body;
    const user = req.user;
    const relDate = dayjs(new Date()).format('YYYY-MM-DD');

    try {
        //refactring casts array because unessessary casts are coming
        const newMovie = {
            title: original_title,
            original_title,
            poster_path: process.env.DEFAULT_MOVIE_POSTER,
            casts: selectedActors,
            producers: selectedProducers,
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

        res.status(200).json({ added: movie });
    }
    catch (error) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
};
