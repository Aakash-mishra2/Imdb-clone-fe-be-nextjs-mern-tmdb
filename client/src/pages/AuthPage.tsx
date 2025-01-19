//Page for Authentication
import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import Register from '../components/auth/Register'
import Login from '../components/auth/Login'
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function AuthPage() {
  const isAuthenticated = useSelector((state: any) => state.account.isAuthenticated)
  const [isLogin, setisLogin] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [])

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', pt: 5, pb: 5 }}>
      <MovieCreationIcon
        sx={{ fontSize: '50px', color: '#FC4747', mb: 3 }}
      />
      <>
        {isLogin ?
          <Login setisLogin={setisLogin} />
          :
          <Register setisLogin={setisLogin} />
        }
      </>
    </Container>
  )
}

export default AuthPage