import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../store/reducerLogic';

import SearchIcon from '@mui/icons-material/Search';
import VideoCard from '../components/reusable/VideoCard';
import SkeletonLoader from '../components/reusable/SkeletonLoader';
import PaginationComponent from '../components/reusable/Pagination';
import NothingToShow from '../components/reusable/NothingToShow';

import { VideoType } from '../types/types'

function MoviePage() {

  const dispatch = useDispatch();
  const [allMovies, setAllMovies] = useState<VideoType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>(""); //state for onChange of input box
  const [pageNo, setPageNo] = useState<number>(1);
  const [count, setCount] = useState<number>(1)
  const [searchInput, setSearchInput] = useState<string>("");  //state for searching videos

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        await axios.get(`/movie/get?search=${searchQuery}&pageNo=${pageNo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
          .then((response) => {
            setAllMovies(response.data?.results);
            setCount(response.data?.total_pages);
            setLoading(false);
          })
      } catch (error) {
        setLoading(false);
        dispatch(setSnackbar({ open: true, message: "Error occurred" }));
      }
    }
    fetchMovies()
  }, [searchInput, pageNo])

  const handleSearch = async () => {
    setPageNo(1)
    setSearchInput(searchQuery)
  }

  return (
    <main className='flex flex-col xs:w-[100%] md:w-[95vw] gap-4'>
      <header className='bg-secondary h-[50px] rounded-xl flex gap-2 items-center px-3'>
        <SearchIcon sx={{ color: 'white' }} />
        <input
          type='text'
          placeholder='Search for movies'
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
          {!searchInput ? "Movies" : `Found ${(allMovies?.length || 1) * count} results for '${searchInput}'`}
        </h1>
        {!loading ?

          allMovies?.length > 0 ?
            <>
              <div className='xs:flex xs:flex-col xs:items-center sm:grid bdsm:grid-cols-2 md:grid-cols-3 bdmd:grid-cols-4 lg:grid-cols-6 gap-0 mt-4'>
                {allMovies && allMovies.map((movie, _index) => {
                  return (
                    <VideoCard
                      imageUrl={movie?.poster_path}
                      title={movie?.original_title}
                      adult={movie?.adult}
                      id={(movie?._id ? movie?._id : movie?.id)}
                      videoType="movie"
                      isNewMovie={!!movie?._id}
                      releaseDate={movie?.release_date}
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

export default MoviePage
