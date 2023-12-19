import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSession } from '@inrupt/solid-ui-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import Profile from './Profile'
// import About from './About'
import LoginScreen from './Login/LoginScreen'
import { handleIncomingRedirect } from '@inrupt/solid-client-authn-browser'

function RouterWrapper() {
  const { session, sessionRequestInProgress } = useSession()
  const [user] = useAuthState(auth)

  const userIsLoggedIn = session.info.isLoggedIn || user !== null

  async function handleSolidRedirect() {
    await handleIncomingRedirect({
      restorePreviousSession: true,
    }).catch((error: Error) => console.log(error.message))
  }

  function profileIfAuthenticated() {
    void handleSolidRedirect()

    if (userIsLoggedIn) {
      if (session.info.isLoggedIn) {
        return <Profile />
      } else {
        return <Profile />
      }
    } else {
      return <Navigate to="/login" />
    }
  }

  function loginIfNotAuthenticated() {
    void handleSolidRedirect()

    if (!userIsLoggedIn) {
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
    return <h1>Loading...</h1>
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
