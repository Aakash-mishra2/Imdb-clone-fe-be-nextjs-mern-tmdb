import BookmarkModel from "../models/BookmarkModel.js"
import VideoModel from "../models/VideoModel.js"

//creating a bookmark for a specific user
export const createBookmark = async(req, res)=>{
    const {videoInfo, bookmark_type} = req.body
    try {

        //checking whether this video has already been saved or not. Bceause may be other user has already created this video and if he has then we just have to link the id to users bookmark

        const videoData = await VideoModel.findOne({videoId: videoInfo.id})
        let videoId;
        if(!videoData){

            //creating video document for movie/tv_series.
            const dataToSave = {
                videoId: videoInfo.id,
                adult: videoInfo.adult || false,
                poster_path: videoInfo?.poster_path,
                release_date: videoInfo?.release_date,
                title: videoInfo?.title
            }
            const video = new VideoModel(dataToSave);
            video.save();
            videoId = video._id
        }
        else{
            videoId = videoData._id
        }
        
        //getting the use from the request object after token validation through middleware
        const user = req.user;

        //checking if the user has already bookmark that video or not
        const data = await BookmarkModel.findOne({
            videoId: videoId,
            userId: user?.id
        });

        if(data){
            return res.status(200).json({status: true, data: "Already bookmarked"});
        }
        else{
            const bookmark = new BookmarkModel({userId: user?.id, bookmark_type, videoId});
            bookmark.save();
    
            return res.status(200).json({status: true, data: "Bookmark created successfully"});
        }

    } catch (error) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
}

//Fetching bookmarks for a particular user

export const getAllBookmarks = async(req, res)=>{
    const {search} = req.query;
    try {
        //getting user info embedded by middleware in request object after token verification.
        const user = req.user;
        const allBookmarks = await BookmarkModel.find({userId: user.id})
        .populate('videoId').sort({'createdAt': -1})

        //Seperating movie and tv-series
        let newResponse = {
            movie: [],
            tv: []
        }
        for(let bookmark of allBookmarks){
            if(bookmark.bookmark_type === 'movie'){
                newResponse.movie.push(bookmark)
            }
            else{
                newResponse.tv.push(bookmark)
            }
        }

        //If length of search is greater than zero means we are seaching for a particular bookmark
        if(search.length > 0){
            const filteredMovies = newResponse?.movie.filter(
                (movie) =>
                  movie?.videoId?.title.toLowerCase().includes(search.toLowerCase())
            );
              const filteredTvSeries = newResponse?.tv.filter(
                (series) =>
                 series?.videoId?.title.toLowerCase().includes(search.toLowerCase())
            );

            //updating new Response with filtered videos
            newResponse.movie = filteredMovies
            newResponse.tv  = filteredTvSeries
            return res.status(200).json({status: true, data: newResponse});
        }
        else{
            return res.status(200).json({status: true, data: newResponse});
        }

    } catch (error) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
}

//Remove bookmark for a particular user
export const removeBookmark = async(req, res)=>{
    const {bookmarkId} = req.query;
    try {
       
        await BookmarkModel.findByIdAndRemove(bookmarkId)
        return res.status(200).json({status: true, data: "Bookmark removed successfully"});

    } catch (error) {
        res
            .status(500)
            .json({ status: true, error: error, message: "Internal server error" });
    }
}