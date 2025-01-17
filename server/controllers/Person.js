import axios from 'axios'
const apiKey = process.env.TMDB_API_KEY;

//Getting all tv series
export const getPersonBySearch = async (req, res) => {
    const { search } = req.query;
    try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/person?query=${search}&language=en-US&api_key=${apiKey}`
                );
                console.log('response data', response.data);

                const reducedData = response.data.results.map(actor => ({
                    id: actor.id,
                    name: actor.name,
                    profile_path: actor.profile_path,
                }));
                
            return res.status(200).json(reducedData);

    } catch (error) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
};

//Getting a single tv series by its id

export const getSinglePerson = async (req, res) => {
    const { personId } = req.params;
    try {
        let response = await axios.get(
            `https://api.themoviedb.org/3/person/${personId}?language=en-US&api_key=${apiKey}`
        );

        const newResponse = response.data;
        let relevantCasts = newResponse?.credits?.cast;
        const {credits, ...resWithoutCredits} = newResponse;
        
        let finalResponse = {...resWithoutCredits, casts: relevantCasts}

        return res.status(200).json(finalResponse);
    } catch (error) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
};
