import { useSession } from '@inrupt/solid-ui-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { LoginMethod } from '../loginMethodEnum'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const ProfileManagement: React.FC = () => {
  const { session: solidSession } = useSession()

  const [firebaseUser] = useAuthState(auth)

  const authed = solidSession.info.isLoggedIn || firebaseUser !== null

  const navigate = useNavigate()

  if (!authed) {
    return <Navigate to="/login" replace />
  }

  const loginMethod: LoginMethod = solidSession.info.isLoggedIn
    ? LoginMethod.SOLID
    : LoginMethod.FIREBASE

  return (
    <>
      <h1>Congrats, you are authenticated.</h1>
      <h2>
        Authentication method:{' '}
        {loginMethod === LoginMethod.SOLID ? 'Solid' : 'Firebase'}
      </h2>
      <button
        onClick={() => {
          if (loginMethod === LoginMethod.SOLID) {
            solidSession
              .logout({ logoutType: 'app' })
              .then(() => navigate('/login'))
              .catch((error: Error) => {
                console.log(error.message)
              })
          } else {
            signOut(auth)
              .then(() => navigate('/login'))
              .catch((error: Error) => {
                console.log(error.message)
              })
          }
        }}
      >
        Sign out
      </button>
    </>
  )
}

export default ProfileManagement
