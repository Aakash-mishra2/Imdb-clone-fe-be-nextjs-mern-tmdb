//Page to add and modify Favourite Genres
import axios from 'axios';
import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../store/reducerLogic';
import { LoadingButton } from '@mui/lab';
import CheckIcon from '@mui/icons-material/Check';

//Definf the type of genres object
import Loader from '../components/customLoader/Loader';

interface allGenresType {
    name: string;
    id: number;
}

function FavGenres() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    //State for genres
    const [allGenres, setAllGenres] = useState<allGenresType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            const token = localStorage.getItem('token')
            try {
                setLoading(true)
                await axios.get(
                    '/dashboard/get/genres',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                    .then((response) => {
                        setAllGenres(response.data?.data?.genres)
                        setSelectedGenres(response.data?.favGenres?.genres || [])
                        setLoading(false)
                    })
                    .catch(() => {
                        setLoading(false);
                        dispatch(setSnackbar({ open: true, message: "Some error occured" }));
                    })
            } catch (error) {
                console.log(error)
            }
        }
        fetchGenres()
    }, [])

    //Function to handle genres selction and removal
    const handleGenresClick = (id: number) => {
        setSelectedGenres((prevGenres) => {
            const index = prevGenres?.indexOf(id);
            if (index !== -1) {
                return [...prevGenres.slice(0, index), ...prevGenres.slice(index + 1)];
            } else {
                return [...prevGenres, id];
            }
        });
    }

    //Calling api to save all selected genres in database for a preticular user
    const handleAddToFav = async () => {
        const token = localStorage.getItem('token')
        setButtonLoading(true)

        await axios.post('/dashboard/add/genres', {genres: selectedGenres},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(() => {
                setButtonLoading(false);
                dispatch(setSnackbar({ open: true, message: "Favourite genres updated successfully" }))
                navigate('/home')

            }).catch(() => {
                setButtonLoading(false);
                dispatch(setSnackbar({ open: true, message: "Some error occured" }));
            })
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', pt: 5, pb: 5 }}>

            <main className="mt-6  p-4 bg-secondary rounded-xl xs:w-[100%] sm:w-[60%]">
                <h1 className='text-2xl text-center'>
                    Choose Your Favourite
                    <br />
                    <span>Genres</span>
                </h1>
                {!loading ?

                    <div className='grid bdsm:grid-cols-2 bdmd:grid-cols-3 gap-4 mt-4'>
                        {allGenres && allGenres.map((elm) => {
                            return (
                                <div className='cursor-pointer bg-tertiary p-2 rounded-md flex justify-between' role='button'
                                    onClick={() => handleGenresClick(elm?.id)}>
                                    <p>{elm?.name}</p>
                                    {
                                        selectedGenres.includes(elm?.id) ?
                                            <CheckIcon sx={{ backgroundColor: '#161D2F', borderRadius: '20px', padding: '4px' }} />
                                            : null
                                    }
                                </div>
                            )
                        })}
                    </div>
                    :
                    <Loader />
                }
                <LoadingButton
                    loadingPosition="start"
                    onClick={handleAddToFav}
                    loading={buttonLoading}
                    disabled={selectedGenres?.length === 0}
                >
                    {!buttonLoading && "Add to favourite"}
                </LoadingButton>
            </main>
        </Container>

    )
}

export default FavGenres
