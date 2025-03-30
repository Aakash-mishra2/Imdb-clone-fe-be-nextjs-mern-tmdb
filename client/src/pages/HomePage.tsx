//This page is for showing all treading videos and Recommended videos
import React from 'react';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const TrendingBox = React.lazy(() => import('../components/home/TrendingBox'));
const Recommended = React.lazy(() => import('../components/home/Recommended'));

function HomePage() {
  //===================States for searching and pagination 
  const [searchQuery, setSearchQuery] = useState<string>(""); //state for onChange of input box
  const [searchInput, setSearchInput] = useState<string>("");  //state for searching videos
  const [pageNo, setPageNo] = useState<number>(1)

 
  const handleSearch = async () => {
    setPageNo(1)
    setSearchInput(searchQuery)
  }

  return (
    <main className='flex flex-col xs:w-[100%] sm:w-[100%] md:w-[88vw] gap-6'>
      <header className='bg-secondary h-[50px] rounded-xl flex gap-2 items-center px-3 mt-8 sm:mt-0'>
        <SearchIcon sx={{color:'white'}}/>
        <input
          type='text'
          placeholder='Search for movies or TV Series'
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
        <h1 className='text-xl'>Trendings</h1>
        <TrendingBox/>
      </section>

      <section className=''>
        <Recommended searchInput={searchInput} searchQuery={searchQuery} pageNo={pageNo} setPageNo={setPageNo}/>
      </section>

    </main>
  )
}

export default HomePage
