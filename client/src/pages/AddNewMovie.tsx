import axios from 'axios';
import { useState, useEffect, useCallback } from 'react'
import { LoadingButton } from '@mui/lab';
import Loader from '../components/customLoader/Loader';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, Container, Chip } from '@mui/material';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//@ts-ignore
import { setSnackbar } from '../store/reducerLogic.js';
//Definf the type of genres object

interface actor {
  name: string;
  id: number;
}

interface EventType {
  InputEvent: React.ChangeEvent<HTMLInputElement>;
}

function AddNewMovie() {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [results, setResults] = useState<actor[]>([]);
  const [selectedActors, setSelectedActors] = useState<any[]>([]);
  const [selectedProducer, setSelectedProducer] = useState<any>({ name: "", id: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState({
    titleError: false,
    summaryError: false,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
    message: ""
  });


  const fetchSearchResults = async (query: string) => {
    if (!query) return;

    setError({
      titleError: false,
      summaryError: false,
    });
    try {
      const response = await axios.get(`/person/get?search=${query}&pageNo=1`);
      setResults(response.data);
    } catch (err) {
      //setError('Failed to fetch data.');
    }
  };

  const debouncedSearch = debounce((query: string) => {
    fetchSearchResults(query);
  }, 300);

  // Handle search input change
  const handleSearchChange = useCallback((obj: any) => {
    setTimeout(() => fetchSearchResults(obj.target.value), 500);
    debouncedSearch(obj.target.value);
  }, []);

  useEffect(() => {
    return () => { debouncedSearch.cancel(); }
  }, [selectedProducer])

  // Single function to handles input change of both input
  const handleChange = (e: EventType[`InputEvent`], field: string) => {
    const text = e.target.value;
    const newField = field + "Error";
    if (text) {
      setError((prev) => {
        return { ...prev, [newField]: false };
      });
    }
    if (field === "title") setTitle(text);
    else if (field === "summary") setSummary(text);
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')

    const formObject = {
      title: title,
      original_title: title,
      summary: summary,
      selectedActors: selectedActors,
      selectedProducer: selectedProducer,
    };
    setLoading(true);
    const response: any = await axios.post('/movie/add', formObject, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        setLoading(false);
        dispatch(setSnackbar({ open: true, message: "Added Movie Succesfully." }));
        navigate("/home/movies");
      })
      .catch((_err) => {
        dispatch(setSnackbar({ open: true, message: "Added Movie Succesfully." }))
      });

  }

  return (

    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', pt: 5, pb: 5 }}>
      <main className="mt-6  p-4 bg-secondary rounded-xl xs:w-[100%] sm:w-[60%]">
        <h1 className='text-2xl text-center'>
          New Movie
          <br />
        </h1>
        {!loading ?
          <form className='w-[100%] relative' onSubmit={handleSubmit} >
            <TextField
              id="filled-search"
              label="Title"
              variant="filled"
              type='text'
              sx={{
                marginTop: '30px',
                width: '100%',
                '& .css-e2jmdx': {
                  borderBottom: `'1px solid #FC4747 !important'}`
                },
                fontSize: '14px'
              }}
              value={title}
              onChange={(e: EventType[`InputEvent`]) => handleChange(e, "title")}
            />
            <TextField
              id="filled-search"
              label="Summary"
              variant="filled"
              type='text'
              sx={{
                marginTop: '30px',
                width: '100%',
                '& .css-e2jmdx': {
                  borderBottom: `'1px solid #FC4747 !important'}`
                },
                fontSize: '14px'
              }}
              value={summary}
              onChange={(e: EventType[`InputEvent`]) => handleChange(e, "summary")}
            />

            <Autocomplete
              multiple
              id="tags-outlined"
              options={results}
              getOptionLabel={(option) => option.name}
              value={selectedActors}
              onChange={(event: any, newValue: any[]) => {
                event.preventDefault();
                setSelectedActors(newValue)
              }
              }
              disableCloseOnSelect
              filterSelectedOptions
              onInputChange={(_, newInputValue: string) => handleSearchChange({ target: { value: newInputValue } })}
              sx={{
                '& MuiFormLabel-root': {
                  color: 'white',
                },
                '& .css-e2jmdx': {
                  color: 'white'
                },
                '& .MuiFormControl-root': {
                  backgroundColor: '#161D2F',
                  marginTop: '4px'
                },
                fontSize: '14px',
                '& .MuiFormLabel-root ': {
                  marginBottom: '8px'
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Actors"
                  variant="filled"
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: 'white', // White color for label
                    },
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#222b42', // Dark background for input field
                      '& fieldset': {
                        borderColor: '#666', // Border color for input field
                      },
                      '&:hover fieldset': {
                        borderColor: '#888', // Border color on hover
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: 'white', // White color for input text
                      marginTop: '4px'
                    },
                    '& .MuiInputBase-root': {
                      backgroundColor: '#161D2F'
                    }
                  }}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option: any, index: number) => (
                  <Chip
                    label={option.name}
                    {...getTagProps({ index })}
                    sx={{
                      '& .MuiChip-label': {
                        color: 'white', // White color for label
                      },
                      '& .MuiSvgIcon-root': {
                        color: 'white',
                      },
                      '& .MuiInputBase-input': {
                        color: 'white', // White color for input text
                      },
                      '& .MuiButtonBase-root': {
                        color: 'white'
                      }
                    }}
                  />
                ))
              }
            />
            <Autocomplete
              freeSolo
              options={results}
              getOptionLabel={(option) => option.name}
              value={selectedProducer}
              onChange={(event: any, newValue: any) => {
                event.preventDefault();
                setSelectedProducer(newValue);
              }
              }
              disableCloseOnSelect
              filterSelectedOptions
              onInputChange={(_, newInputValue: string) => handleSearchChange({ target: { value: newInputValue } })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Producer"
                  variant="filled"
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: 'white', // White color for label
                    },
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#222b42', // Dark background for input field
                      '& fieldset': {
                        borderColor: '#666', // Border color for input field
                      },
                      '&:hover fieldset': {
                        borderColor: '#888', // Border color on hover
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: 'white', // White color for input text
                      marginTop: '4px'
                    },
                    '& .MuiInputBase-root': {
                      backgroundColor: '#161D2F'
                    }
                  }}
                />
              )}
            />

            <LoadingButton
              loadingPosition="start"
              onClick={handleSubmit}
              loading={loading}
            >
              {!loading && "Add New Movie"}
            </LoadingButton>
          </form>
          :
          <Loader />
        }
      </main>
    </Container>

  )
}

export default AddNewMovie
