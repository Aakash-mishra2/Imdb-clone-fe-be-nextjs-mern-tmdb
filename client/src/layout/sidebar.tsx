import DashboardIcon from '@mui/icons-material/Dashboard';
import TheatersIcon from '@mui/icons-material/Theaters';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSelector } from 'react-redux';
import movieIcon from "../assets/iconLogo.png";
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Tooltip } from '@mui/material';

function sidebar() {
    const user = useSelector((state: any) => state.account.user);
    const location = useLocation();
    const { pathname } = location;

    //Function to handle logout
    const handleLogOut = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }

    return (
        <header
            className='xs:h-[22vh] sm:h-[10vh] md:h-[90vh] xs:w-[100%] px-4 md:w-[5vw] bg-defaultBkg 
            md:rounded-2xl sm:flex md:flex-col items-center py-4 md:py-0 justify-between md:fixed  xs:px-5 md:px-0 xs:mb-4 md:mb-4 md:overflow-y-scroll overflow-y-none scrollbar-thin sm:scrollbar-none items-center'
        >
            <div className='xs:flex justify-center '>
                <img src={movieIcon} className='h-16 w-20 md:w-24 md:mb-4' />
            </div>

            <div className='grid grid-cols-4 grid-rows-2 gap-2 pl-4 sm:pl-0 mt-1 sm:flex md:flex-col items-center justify-center sm:gap-6'>

                <Link to='/home'>
                    <Tooltip title="Dashboard" placement='right-start' >
                        <DashboardIcon
                            sx={{
                                color: `${pathname === '/home' ? 'white' : '#5A698F'}`
                            }}
                        />
                    </Tooltip>
                </Link>
                <Link to='/home/movies'>
                    <Tooltip title="Movies" placement='right-start' >
                        <TheatersIcon
                            sx={{
                                color: `${pathname === '/home/movies' ? 'white' : '#5A698F'}`
                            }}
                        />
                    </Tooltip>
                </Link>
                <Link to='/home/tv-series'>
                    <Tooltip title="Tv Series" placement='right-start' >
                        <LiveTvIcon
                            sx={{
                                color: `${pathname === '/home/tv-series' ? 'white' : '#5A698F'}`
                            }}
                        />
                    </Tooltip>
                </Link>
                <Link to='/home/bookmark'>
                    <Tooltip title="Bookmark" placement='right-start' >
                        <BookmarkIcon
                            sx={{
                                color: `${pathname === '/home/bookmark' ? 'white' : '#5A698F'}`
                            }}
                        />
                    </Tooltip>
                </Link>
                <Link to='/fav-genres'>
                    <Tooltip title="Fav Genres" placement='right-start'>
                        <FavoriteIcon
                            sx={{
                                color: `${pathname === '/fav-genres' ? 'white' : '#5A698F'}`
                            }}
                        />
                    </Tooltip>
                </Link>
                <Link to='/add-movie'>
                    <Tooltip title="Add New Movie" placement='right-start' >
                        <AddCircleIcon
                            sx={{
                                color: `${pathname === '/fav-genres' ? 'white' : '#FC4747'}`,
                                fontSize: '30px',
                            }}
                        />
                    </Tooltip>
                </Link>
                <div className='flex md:flex-col items-center gap-6  sm:ml-[150px] md:ml-[0px] md:mt-[150px]'>
                    <Tooltip title="Logout" placement='right-start' >
                        <div className='text-[#5A698F] hover:text-[#FFFFFF] cursor-pointer' onClick={handleLogOut}>
                            <LogoutIcon />
                        </div>
                    </Tooltip>

                    <Avatar sx={{ backgroundColor: '#FC4747', color: '#FFFFFF' }}>
                        {user?.email?.charAt(0).toUpperCase()}
                    </Avatar>
                </div>
            </div>

        </header>
    )
}

export default sidebar
