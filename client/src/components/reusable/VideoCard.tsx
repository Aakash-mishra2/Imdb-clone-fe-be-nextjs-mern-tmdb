//This compopnent will show the content of movies and tv series in card form
import { useContext, useState } from 'react'
import { useDispatch } from 'react-redux';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import './reusable.css'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import CircularProgress from '@mui/material/CircularProgress';

//@ts-ignore
import { createBookmark, removeBookmark, fetchBookmark, setSnackbar } from '../../store/reducerLogic.js';

//Defing the type of props that component can accept

interface VideoCardProps {
    imageUrl: string;
    title?: string;
    adult?: boolean;
    id?: number;
    videoType: string;
    releaseDate?: string;
    bookmark?: boolean;
    bookmarkId?: any;
    isNewMovie?: boolean;
    isTrendingMovie?: boolean;
}


function VideoCard({ title, imageUrl, adult, id, videoType, releaseDate, bookmark = false, bookmarkId, isNewMovie = false, isTrendingMovie = false }: VideoCardProps) {

    // const { createBookmark, removeBookmark, fetchBookmark, setSnackbar } = useContext(AppContext)
    //state to check whether the current trending video has been bookmarked or not
    const dispatch = useDispatch();
    const [isBookmarked, setIsBookmarked] = useState(bookmark)
    const [isBookmarking, setIsBookmarking] = useState<boolean>(false) // state to show laoder when adding or removing bookmark

    const handleCreateBookMark = async () => {
        setIsBookmarking(true)
        const videoInfo = {
            title,
            release_date: releaseDate,
            poster_path: imageUrl,
            adult, id
        }
        dispatch(createBookmark(videoInfo, videoType));
        setIsBookmarking(false)
        setIsBookmarked(true)
    }

    const handleRemoveBookmark = async () => {
        if (!bookmarkId) {
            dispatch(setSnackbar({ open: true, message: "Go to bookmark tab to remove." }));
            return;
        }
        setIsBookmarking(true)

        dispatch(removeBookmark(bookmarkId));
        setIsBookmarking(false)

        setIsBookmarked(false)
        dispatch(fetchBookmark());
    }

    const navigate = useNavigate();
    let redirectionUrl = `/home/video/details?type=${videoType}&id=${id}`;

    if (isNewMovie) redirectionUrl += 'isNew=true';

    return (
        <div className={`${isTrendingMovie ? 'w-[300px]' : 'h-[240px] w-[250px]'}  relative videCard-container}`}>
            <img
                src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
                alt='image'
                className={`${isTrendingMovie ? 'rounded-lg h-[190px] w-[300px]' : 'rounded-sm h-[170px] w-[250px]'} hover:opacity-70 cursor-pointer object-cover`}
                role='button'
                onClick={() => navigate(redirectionUrl)}
            />

            <div className={`absolute top-3 right-3 bg-gray-600 bg-opacity-50  h-10 w-10 flex items-center justify-center rounded-full hover:bg-white cursor-pointer hover:text-black `}
            >
                {!isBookmarking ?
                    <>
                        {!isBookmarked ?
                            <BookmarkBorderIcon onClick={handleCreateBookMark} />
                            :
                            <BookmarkIcon onClick={handleRemoveBookmark} />
                        }
                    </>
                    :
                    <CircularProgress sx={{ height: '25px', width: '25px', color: '#FFFFFF', marginTop: '2px' }} />
                }
            </div>

            <div
                className='gap-2 absolute top-[70px] left-[90px] bg-white bg-opacity-30 p-2 rounded-full text-xl hidden cursor-pointer play-container'
                role='button'
                onClick={() => navigate(redirectionUrl)}
            >
                <PlayCircleIcon sx={{ fontSize: '30px' }} />
                <p>Play</p>
            </div>
            {/* <div className='flex flex-row justify-between'>
                <div className='flex flex-col'> */}

            <div className={`flex gap-7 text-sm mt-2 ${isTrendingMovie ? 'absolute bottom-[30px] left-[10px]' : ' text-primary'}`}>
                <p>{releaseDate?.split('-')[0]}</p>
                <ul className='flex list-disc gap-6'>
                    <li>{videoType}</li>
                    <li>{adult ? '18+' : 'PG'}</li>
                </ul>
            </div>
            <h1 className={isTrendingMovie ? 'absolute bottom-[5px] left-[10px] font-semibold' : ''}>
                {
                    title?.slice(0, 20)
                }
            </h1>
            {/* </div>
            </div> */}
        </div>
    )
}

export default VideoCard
