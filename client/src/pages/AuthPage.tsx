//Page for Authentication
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import appLogo from "../../src/assets/logo.png";
const Register = React.lazy(() => import('../components/auth/Register'));
const Login = React.lazy(() => import('../components/auth/Login'));

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
      <Container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
        {/* <MovieCreationIcon
        sx={{ fontSize: '50px', color: '#FC4747', mb: 3 }}
      /> */}
        <img src={appLogo} alt="app_logo" loading="lazy" className="w-full h-24 mb-4" />
      </Container>
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
