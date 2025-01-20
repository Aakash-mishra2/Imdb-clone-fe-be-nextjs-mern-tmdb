
const apiKey = process.env.TMDB_API_KEY;
import axios from 'axios'

//Getting all tv series
export const getAllTvSeries = async (req, res) => {
  const { search, pageNo } = req.query;
  try {

    if (search.length === 0) {

      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=${pageNo}&sort_by=popularity.desc&api_key=${apiKey}`
      );
      return res.status(200).json(response.data);
    }
    else {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(search)}&include_adult=true&language=en-US&page=${pageNo}&api_key=${apiKey}`
      );
      return res.status(200).json(response.data);
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: true, error: error, message: "Internal server error" });
  }
};

//Getting a single tv series by its id

export const getSingleTvSeries = async (req, res) => {
  const { seriesId } = req.params;
  try {
    let response = await axios.get(
      `https://api.themoviedb.org/3/tv/${seriesId}?append_to_response=credits&language=en-US&api_key=${apiKey}`
    );

    const newResponse = response.data;
    let relevantCasts = newResponse?.credits?.cast;
    const { credits, ...resWithoutCredits } = newResponse;

    let finalResponse = { ...resWithoutCredits, casts: relevantCasts }

    return res.status(200).json(finalResponse);
  } catch (error) {
    res
      .status(500)
      .json({ status: true, error: error, message: "Internal server error" });
  }
};
