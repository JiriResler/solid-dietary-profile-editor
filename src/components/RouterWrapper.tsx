import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSession } from '@inrupt/solid-ui-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import Profile from './Profile'
import About from './About'
import Login from './Login'

function RouterWrapper() {
  const { session } = useSession()
  const [user] = useAuthState(auth)

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
      return <Login />
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

  return (
    <BrowserRouter
      basename={import.meta.env.DEV ? '/' : '/solid-dietary-profile-editor/'}
    >
      <Routes>
        <Route path="/" element={profileIfAuthenticated()} />
        <Route path="/login" element={loginIfNotAuthenticated()} />
        <Route path="/about" element={aboutIfNotAuthenticated()} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouterWrapper
