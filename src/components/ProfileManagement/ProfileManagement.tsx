import { useSession } from '@inrupt/solid-ui-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'
import { auth } from '../../firebase'

const ProfileManagement: React.FC = () => {
  const { session: solidSession } = useSession()

  const [firebaseUser] = useAuthState(auth)

  const authed = solidSession.info.isLoggedIn || firebaseUser !== null

  if (!authed) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <h1>Congrats, you are authenticated.</h1>
      <button>Sign out</button>
    </>
  )
}

export default ProfileManagement
