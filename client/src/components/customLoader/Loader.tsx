//This Component is for showing loader when app is loading
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import './Loader.css'; 

//Coponent to create a custome Loader
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loading-icon">
        <MovieCreationIcon 
            sx={{fontSize:'50px', color:'#FC4747'}}
        />
      </div>
      <p className='text-sm text-primary'>Getting ready...</p>
    </div>
  );
};

export default Loader;