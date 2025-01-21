import UserModel from "../models/UserModel.js";
import axios from 'axios'
const apiKey = process.env.TMDB_API_KEY

//getting all trending videos(movies/tv_series)
export const getAllTrendingVideos = async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${apiKey}`,
        );
        return res.status(200).json(response.data);
    } catch (error) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
};

//Getting recommendation for a particular user
export const getRecommendedations = async(req, res)=>{
    const {pageNo, search} = req.query

    try {

        //If search has length greater than zero means we are searching for a sepecific videos
        if(search.length > 0){

            const response = await axios.get(
                `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(search)}&include_adult=false&language=en-US&page=${pageNo}&api_key=${apiKey}`
            );
            return res.status(200).json(response.data);
        }
        else {
            const user = req.user
            const userData = await UserModel.findById(user._id).select({genres: 1})

            const allFavGenres = userData.genres;

            // //getting all movies based on generas
            if(allFavGenres.length > 0){

                //getting all movies based on generas
                const movieData = await axios.get(
                    `https://api.themoviedb.org/3/discover/movie?include_adult=true&language=en&page=${pageNo}&sort_by=popularity.desc&with_genres=${allFavGenres.join(',')}&api_key=${apiKey}`
                );
                
                
                //getting all tv series based on generas
                const tvSeriesData = await axios.get(
                    `https://api.themoviedb.org/3/discover/tv?include_adult=true&language=en&page=${pageNo}&sort_by=popularity.desc&with_genres=${allFavGenres.join(',')}&api_key=${apiKey}`
                );
                
                //Merging both tv series and movies
                let allRecommnededVideos = [...movieData.data.results, ...tvSeriesData.data.results]
                
                //sorting videos based on their release date in ascending order
                allRecommnededVideos.sort((a, b) => (a.popularity < b.popularity) ? 1 : -1)
                
                return res.status(200).json({
                    page: pageNo, 
                    results:allRecommnededVideos, 
                    total_pages:movieData?.data?.total_pages
                });
            }
            else{
                return res.status(200).json([]);
            }
        }
    } catch (error) {
        res
        .status(500)
        .json({ status: true, error: error, message: "Internal server error" });
    }
}


// add Favourite genres to particular user document

export const addFavouriteGenres = async(req, res)=>{
    const genresList = req.body.genres;
    try {
        const user = req.user

        await UserModel.findByIdAndUpdate(
            user._id,
            {genres: genresList},
            { new: true }
        )
        return res.status(200).json({status:true, data:"Favourite genres updated successfully"});

    } catch (error) {
        res
        .status(500)
        .json({ status: true, error: error, message: "Internal server error" });
    }
}


//Function to get all genres so that user can select their favourite genres
export const getAllGenres = async(req, res)=>{
    try {
        //getting previous selected favourite genres from the user (this will be helpfull when we update our fav genres)
        const user = req.user
        //finding all favourite generas for a user
        const favGenres = await UserModel.findById(user._id).select({genres: 1})

        const response = await axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`
        );
        return res.status(200).json({status:true, favGenres,  data: response.data });

    } catch (error) {
        res
        .status(500)
        .json({ status: true, error: error, message: "Internal server error" });
    }
}
