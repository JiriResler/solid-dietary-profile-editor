import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSession } from '@inrupt/solid-ui-react'
// import { useAuthState } from 'react-firebase-hooks/auth'
// import { auth } from '../firebase'
import Profile from './Profile'
// import About from './About'
import LoginScreen from './LoginScreen'
// import LogInSolid from './LogInSolid'

function RouterWrapper() {
  const { session, sessionRequestInProgress } = useSession()
  // const [user] = useAuthState(auth)

  // const userIsLoggedIn =  || user !== null

  function profileIfAuthenticated() {
    if (session.info.isLoggedIn) {
      if (session.info.isLoggedIn) {
        return <Profile selectedSignInMethod="solid" />
      } else {
        return <Profile selectedSignInMethod="firebase" />
      }
    } else {
      return <Navigate to="/login" />
    }
  }

  function loginIfNotAuthenticated() {
    if (!session.info.isLoggedIn) {
      return <LoginScreen />
    } else {
      return <Navigate to="/" />
    }
  }

  // function aboutIfNotAuthenticated() {
  //   if (!userIsLoggedIn) {
  //     return <About />
  //   } else {
  //     return <Navigate to="/" />
  //   }
  // }

  if (sessionRequestInProgress) {
    return <h1>Redirecting to provider...</h1>
  }

  return (
    <BrowserRouter
      basename={import.meta.env.DEV ? '/' : '/solid-dietary-profile-editor/'}
    >
      <Routes>
        <Route path="/" element={profileIfAuthenticated()} />
        <Route path="/login" element={loginIfNotAuthenticated()} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouterWrapper
