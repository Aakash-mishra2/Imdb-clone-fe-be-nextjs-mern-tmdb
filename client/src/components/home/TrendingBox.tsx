//This component is to show trending videos on the home page
import { useEffect, useRef, useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios';
import TrendingVideoCard from './TrendingVideoCard';
import '../reusable/reusable.css'
import SkeletonLoader from '../reusable/SkeletonLoader';
import {TrendingVideoType} from '../../types/types'

function TrendingBox() {

    //state for trending videos
    const [trendings, setTrendings] = useState<TrendingVideoType[]>([]);
    const [loading, setLoading] = useState<boolean>(true)

    //This ref helps to scroll the content which is in Trending box 
    const scrollerRef = useRef<HTMLDivElement | null>(null);

    //Functions to scroll the items in Trending box right and left on right, left icon click
    const scrollLeft = () => {
        if (scrollerRef.current) {
            scrollerRef.current.scrollTo({
                left: scrollerRef.current.scrollLeft - 400,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollerRef.current) {
            scrollerRef.current.scrollTo({
                left: scrollerRef.current.scrollLeft + 400,
                behavior: 'smooth',
            });
        }
    };


    //Fetching all the trending videos on component mount
    useEffect(() => {
        axios.get(`/dashboard/trendings`)
            .then((response) => {
                setTrendings(response.data?.results)
                setLoading(false)
            }).catch(() => {
                setLoading(false)
            })
    }, [])

    return (
        <>
            {!loading ? <main className='w-full relative h-[] px-8 mt-4'>
                <div className='h-full flex items-center justify-center absolute left-0 z-10'>
                    <p className='bg-gray-600 bg-opacity-50  h-10 w-10 flex items-center justify-center rounded-full hover:bg-white cursor-pointer hover:text-black'
                        onClick={scrollLeft}
                    >
                        <ArrowBackIosNewIcon />
                    </p>
                </div>
                <div className='h-full flex items-center justify-center absolute right-0 z-10'>
                    <p className='bg-gray-600 bg-opacity-50  h-10 w-10 flex items-center justify-center rounded-full hover:bg-white cursor-pointer hover:text-black'
                        onClick={scrollRight}
                    >
                        <ArrowForwardIosIcon />
                    </p>
                </div>

                <section className='flex gap-10 w-[100%] overflow-x-scroll' ref={scrollerRef}>
                    {trendings?.map((video) => {
                        return (
                            <div >
                                <TrendingVideoCard
                                    imageUrl={video?.poster_path || ""}
                                    title={
                                        video?.media_type === 'movie'
                                            ? video?.title
                                            : video?.original_name
                                    }
                                    adult={video?.adult}
                                    id={video?.id}
                                    videoType={video?.media_type}
                                    releaseDate={
                                        video?.media_type === 'movie'
                                            ? video?.release_date
                                            : video?.first_air_date
                                    }
                                />
                            </div>
                        )
                    })}
                </section>

            </main >
                :
                <SkeletonLoader count={5} />

            }
        </>

    )
}

export default TrendingBox