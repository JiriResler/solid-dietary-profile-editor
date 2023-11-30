import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSession } from '@inrupt/solid-ui-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import Profile from './Profile'
import About from './About'
import LoginScreen from './LoginScreen'
import LogInSolid from './LogInSolid'

function RouterWrapper() {
  const { session, sessionRequestInProgress } = useSession()
  const [user] = useAuthState(auth)

  const userIsLoggedIn = session.info.isLoggedIn || user !== null

  function profileIfAuthenticated() {
    const userIsLoggedIn = session.info.isLoggedIn || user !== null

    if (userIsLoggedIn) {
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
    const userIsLoggedOut = !session.info.isLoggedIn && user === null

    if (userIsLoggedOut) {
      return <LoginScreen />
    } else {
      return <Navigate to="/" />
    }
  }

  function aboutIfNotAuthenticated() {
    const userIsLoggedOut = !session.info.isLoggedIn && user === null

    if (userIsLoggedOut) {
      return <About />
    } else {
      return <Navigate to="/" />
    }
  }

  if (sessionRequestInProgress) {
    return <h1>Loading...</h1>
  }

  return (
    <BrowserRouter
      basename={import.meta.env.DEV ? '/' : '/solid-dietary-profile-editor/'}
    >
      {userIsLoggedIn && (
        <Routes>
          <Route path="/" element={<Profile selectedSignInMethod="solid" />} />
          <Route
            path="/login"
            element={<Profile selectedSignInMethod="solid" />}
          />
        </Routes>
      )}

      {!userIsLoggedIn && (
        <Routes>
          <Route
            path="/"
            element={<LogInSolid setLoginWithSolid={() => {}} />}
          />
          <Route
            path="/login"
            element={<LogInSolid setLoginWithSolid={() => {}} />}
          />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default RouterWrapper
