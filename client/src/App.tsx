import axios from 'axios';
import './App.css'
import { Suspense } from 'react';

import Routes from './routes'
import CustomSnackbar from './components/reusable/CustomSnackbar'
import Loader from './components/customLoader/Loader';

axios.defaults.baseURL = "https://movie-listing-api-service.onrender.com/api";
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

function App() {
  return (
    <>
      <Suspense
        fallback={<Loader />}
      >
        <>
          <Routes />
          <CustomSnackbar />
        </>
      </Suspense>
    </>
  )
}

export default App
