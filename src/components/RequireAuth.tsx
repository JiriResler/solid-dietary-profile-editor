import { useSession } from '@inrupt/solid-ui-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'
import { auth } from '../firebase'
import { PropsWithChildren } from 'react'

const RequireAuth: React.FC<PropsWithChildren> = (props) => {
  const { session: solidSession } = useSession()

  const [firebaseUser] = useAuthState(auth)

  const authed = solidSession.info.isLoggedIn || firebaseUser !== null

  return authed === true ? props.children : <Navigate to="/login" replace />
}

export default RequireAuth
