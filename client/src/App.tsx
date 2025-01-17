import axios from 'axios';
import './App.css'
import Routes from './routes'
import CustomSnackbar from './components/reusable/CustomSnackbar'
import Loader from './components/customLoader/Loader';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';

//Adding axios baseurl and headers so that we don't have to write it again and again
//axios.defaults.baseURL = "https://movie-app-server-wheat.vercel.app/api";

axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

function App() {
  const { isAppLoading } = useContext(AppContext)

  return (
    <>
      {!isAppLoading ?
        <>
          <Routes />
          <CustomSnackbar />
        </>
        :
        <Loader />
      }
    </>
  )
}

export default App
