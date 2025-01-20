//This Page will show all the tv series fetched from the server
import axios from 'axios';
import { useEffect, useState } from 'react'
import { VideoType } from '../types/types'

import SearchIcon from '@mui/icons-material/Search';
import VideoCard from '../components/reusable/VideoCard';
import SkeletonLoader from '../components/reusable/SkeletonLoader';
import PaginationComponent from '../components/reusable/Pagination';
import NothingToShow from '../components/reusable/NothingToShow';
import { useDispatch } from 'react-redux';

//@ts-ignore
import { setSnackbar } from "../store/reducerLogic.js";

function TVSeriesPage() {

  const dispatch = useDispatch();
  const [allTvSeries, setTvSeries] = useState<VideoType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>(""); //state for onChange of input box
  const [pageNo, setPageNo] = useState<number>(1);
  const [count, setCount] = useState<number>(1)

  const [searchInput, setSearchInput] = useState<string>("");  //state for searching videos

  const handleSearch = async () => {
    setPageNo(1);
    setSearchInput(searchQuery);
  }

  useEffect(() => {
    const fetchTVSeries = async () => {
      try {
        setLoading(true)
        await axios.get(`/tv/get?search=${searchQuery}&pageNo=${pageNo}`)
          .then((response) => {
            setTvSeries(response.data?.results)
            setCount(response.data?.total_pages)
            setLoading(false)
          })
      } catch (error) {
        setLoading(false);
        dispatch(setSnackbar({ open: true, message: "Error occurred" }));
      }
    }
    fetchTVSeries()
  }, [searchInput, pageNo])



  return (
    <main className='flex flex-col xs:w-[100%] md:w-[95vw] gap-6'>
      <header className='bg-secondary h-[50px] rounded-xl flex gap-2 items-center px-3'>
        <SearchIcon sx={{ color: 'white' }} />
        <input
          type='text'
          placeholder='Search for Tv Series'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
      </header>

      <section className=''>
        <h1 className='text-xl'>
          {!searchInput ? "Tv Series" : `Found ${(allTvSeries?.length || 1) * count} results for '${searchInput}'`}
        </h1>
        {!loading ?
          allTvSeries?.length > 0 ?
            <>
              <div className='grid bdsm:grid-cols-2 md:grid-cols-3 bdmd:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4'>
                {allTvSeries && allTvSeries.map((series, _index) => {
                  return (
                    <VideoCard
                      imageUrl={series?.poster_path}
                      title={series?.name}
                      adult={series?.adult}
                      id={series?.id}
                      videoType="tv"
                      releaseDate={series?.first_air_date}
                    />
                  )
                })}
              </div>
            </>
            :
            <NothingToShow />
          :
          <SkeletonLoader />
        }
        <PaginationComponent count={count} setPageNo={setPageNo} />
      </section>


    </main>
  )
}

export default TVSeriesPage
