//This component will show all recommended videos
import { useEffect, useState } from 'react'
import VideoCard from '../reusable/VideoCard';
import axios from 'axios';
import SkeletonLoader from '../reusable/SkeletonLoader';
import PaginationComponent from '../reusable/Pagination';
import NothingToShow from '../reusable/NothingToShow';
import { VideoType } from '../../types/types'

//Defining the type of props that he can accept
interface propType {
    searchInput: string;
    searchQuery: string;
    pageNo: number,
    setPageNo: React.Dispatch<React.SetStateAction<number>>;
}

function Recommended({ searchInput, searchQuery, pageNo, setPageNo }: propType) {

    //Defining the state for videos which needs to show in recommended section
    const [allVideos, setAllVideos] = useState<VideoType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    //State for pagination
    const [count, setCount] = useState<number>(1)

    //Fetching all the recommended videos on component mount
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true)
                const token = localStorage.getItem('token')
                await axios.get(
                    `/dashboard/recommended?search=${searchQuery}&pageNo=${pageNo}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                    .then((response) => {
                        setAllVideos(response.data?.results)
                        setCount(response.data?.total_pages)
                        setLoading(false)
                    })
            } catch (error) {
                setLoading(false)
            }
        }
        fetchMovies()
    }, [searchInput, pageNo])


    return (
        <section className=''>
            <h1 className='text-xl'>
                {!searchInput ? "Recommended for you" : `Found ${allVideos?.length * count} results of '${searchInput}'`}
            </h1>
            {!loading ?

                <>
                    {allVideos?.length > 0 ?
                        <>
                            <div className='grid bdsm:grid-cols-2 md:grid-cols-3 bdmd:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4'>
                                {allVideos && allVideos.map((video) => {
                                    return (
                                        <VideoCard
                                            imageUrl={video?.poster_path}
                                            title={video?.title || video?.name}
                                            adult={video?.adult}
                                            id={video?.id}
                                            videoType={
                                                video?.first_air_date ? "tv" : "movie"
                                            }
                                            releaseDate={video?.release_date || video?.first_air_date}
                                        />
                                    )
                                })}
                            </div>
                        </>
                        :
                        <NothingToShow />
                    }
                </>

                :
                <SkeletonLoader />
            }

            <PaginationComponent count={count} setPageNo={setPageNo} />

        </section>
    )
}

export default Recommended