import { ReactNode, useState, useLayoutEffect, createContext, Dispatch, SetStateAction } from 'react';
import { userType, snackbarType, bookmarkVideoType } from '../types/types'
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AppProviderProps {
  children: ReactNode;
}

//Defing the type of all its export items
interface AppContextType {
  isAppLoading: boolean;
  setisAppLoading: Dispatch<SetStateAction<boolean>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  user: userType | undefined;
  setUser: Dispatch<SetStateAction<userType | undefined>>;
  snackbar: snackbarType;
  setSnackbar: Dispatch<SetStateAction<snackbarType>>;

  handleClose: any;
  createBookmark: any;
  removeBookmark: any;
  fetchBookmark: any;

  movies: bookmarkVideoType[];
  setMovies: Dispatch<SetStateAction<bookmarkVideoType[]>>;
  tvSeries: bookmarkVideoType[];
  setTvSeries: Dispatch<SetStateAction<bookmarkVideoType[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  pageNo: number;
  setPageNo: Dispatch<SetStateAction<number>>;

}


export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

  //State to track app status 
  const [isAppLoading, setisAppLoading] = useState(true)

  //State to check user status whether authenticated or not
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //State to set the use details
  const [user, setUser] = useState<userType | undefined>(undefined);

  //State for pagination
  const [pageNo, setPageNo] = useState<number>(1)

  //========States for bookmark page
  const [movies, setMovies] = useState<bookmarkVideoType[]>([]);
  const [tvSeries, setTvSeries] = useState<bookmarkVideoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  //========================================

  const navigate = useNavigate()

  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
    message: ""
  })
  const handleClose = () => {
    setSnackbar((prev) => {
      return { ...prev, open: false };
    });
  };

  //Function to fetch user profile on each page refreash
  const fetchProfile = async () => {
    axios
      .get("/auth/me")
      .then((res) => {
        setIsAuthenticated(true);
        setUser(res.data?.content?.data);
        setisAppLoading(false);
        navigate('/home')
      })
      .catch((_err) => {
        setisAppLoading(false);
        navigate("/");
      });
  }

  //Function to fetch all bookmarks including tv series and movies for a particular user
  const fetchBookmark = async (search = "") => {
    const token = localStorage.getItem('token');
    await axios.get(
      `/bookmark/get?search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((response) => {
        setMovies(response.data?.data?.movie)
        setTvSeries(response.data?.data?.tv)
        setLoading(false)
      })
      .catch((_err) => {
        setLoading(false)
        setSnackbar((prev) => {
          return { ...prev, open: true, message: "Error occurred" };
        });
      })
  }

  //Function to create bookmark after clicking on bookmark icon for a particular user
  const createBookmark = async (videoInfo: any, bookmark_type: string) => {
    const token = localStorage.getItem('token');
    await axios.post('/bookmark/create',
      { videoInfo, bookmark_type },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        setSnackbar((prev) => {
          return { ...prev, open: true, message: "Bookmarked successfully" };
        });
      })
      .catch((_err) => {
        setSnackbar((prev) => {
          return { ...prev, open: true, message: "Error occurred" };
        });
      })
  }

  //Function to remove from the bookmark of a particular user
  const removeBookmark = async (bookmarkId: any) => {

    await axios.delete(`/bookmark/delete?bookmarkId=${bookmarkId}`)
      .then(() => {
        setSnackbar((prev) => {
          return { ...prev, open: true, message: "Bookmark deleted successfully" };
        });
      })
      .catch((_err) => {
        setSnackbar((prev) => {
          return { ...prev, open: true, message: "Error occurred" };
        });
      })
  }

  useLayoutEffect(() => {
    fetchProfile()
  }, [])

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user, setUser,
        snackbar, setSnackbar, handleClose,
        isAppLoading, setisAppLoading,
        createBookmark,
        removeBookmark,
        fetchBookmark,
        movies, setMovies,
        tvSeries, setTvSeries,
        loading, setLoading,
        pageNo, setPageNo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
