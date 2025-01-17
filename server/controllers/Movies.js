import axios from 'axios'
const apiKey = process.env.TMDB_API_KEY;

//Getting all movies with pagination
export const getAllMovies = async (req, res) => {
    const { search, pageNo } = req.query;
    try {
        console.log(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=${pageNo}&sort_by=popularity.desc&api_key=${apiKey}`);


        if(search.length === 0){
            const response = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=${pageNo}&sort_by=popularity.desc&api_key=${apiKey}`
            );
            return res.status(200).json(response.data);
        }

        else{
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search)}&include_adult=true&language=en-US&page=${pageNo}&api_key=${apiKey}`
            );
            return res.status(200).json(response.data);
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
        const {casts, ...resWithoutCredits} = newResponse;
        
        let finalResponse = {...resWithoutCredits, casts: releventCasts}
        
        return res.status(200).json(finalResponse);
    } catch (error) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
};
