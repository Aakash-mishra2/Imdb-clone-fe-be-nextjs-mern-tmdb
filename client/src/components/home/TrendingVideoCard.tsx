//This component is for showing Trending video in card

import { useContext, useState } from 'react'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import '../reusable/reusable.css'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import CircularProgress from '@mui/material/CircularProgress';


//Defining the types of propes that component can accept
interface VideoCardProps {
    imageUrl: string;
    title?: string;
    adult?: boolean;
    id?: number;
    videoType?: string;
    releaseDate?: string;
}
  
function TrendingVideoCard({title, imageUrl, adult, id, videoType, releaseDate}:VideoCardProps ) {

    const {createBookmark, setSnackbar} = useContext(AppContext)
    //state to check whether the current trending video has been bookmarked or not
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [isBookmarking, setIsBookmarking] = useState<boolean>(false) // state to show laoder when adding or removing bookmark

    //Function to create a bookmark
    const handleCreateBookMark = async()=>{
        setIsBookmarking(true)

        const videoInfo = {
            title, 
            release_date: releaseDate,
            poster_path: imageUrl,
            adult, id
        }
        await createBookmark(videoInfo, videoType)
        setIsBookmarking(false)

        setIsBookmarked(true)
    }

    //Function to remove bookmark. Remember we need to go to bookmark page to remove the bookmark
    //because the bookmark can only be removed with its mongodb _id
    const handleRemoveBookmark = async()=>{
        setSnackbar((prev) => {
            return { ...prev, open: true, message: "Go to bookmark tab to remove." };
        });
    }
    
    const navigate = useNavigate();

    return (
        <div className=' w-[300px] relative videCard-container'>
            <img
                src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
                alt='image'
                className='rounded-lg h-[190px] w-[300px] hover:opacity-70 cursor-pointer object-cover'
                role='button'
                onClick={()=> 
                    navigate(`/home/video/details?type=${videoType}&id=${id}`)
                }
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
                    <CircularProgress sx={{height:'25px', width:'25px', color:'#FFFFFF', marginTop:'2px'}}/>
                }
            </div>

            <div
                className='gap-2 absolute top-[70px] left-[90px] bg-white bg-opacity-30 p-2 rounded-full text-xl hidden cursor-pointer play-container'
                role='button'
                onClick={()=> 
                    navigate(`/home/video/details?type=${videoType}&id=${id}`)
                }
            >
                <PlayCircleIcon sx={{ fontSize: '30px' }} />
                <p>Play</p>
            </div>


            <div className='flex gap-7 text-sm mt-2 absolute bottom-[30px] left-[10px]'>
                <p>{(releaseDate || "").split('-')[0]}</p>
                <ul className='flex list-disc gap-6'>
                    <li>{videoType}</li>
                    <li>{adult ? '18+' : 'PG'}</li>
                </ul>
            </div>
            <h1 className='absolute bottom-[5px] left-[10px] font-semibold'>
                {
                    (title || "").slice(0, 20)
                }
            </h1>

        </div>
    )
}

export default TrendingVideoCard