import { useState, useEffect, useContext } from 'react'
import ProfileOverview from './ProfileOverview/ProfileOverview'
import './DietaryProfileManagement.css'
import DietaryPreferencesForm from './DietaryPreferencesForm/DietaryPreferencesForm'
import { useSession } from '@inrupt/solid-ui-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { Navigate } from 'react-router-dom'
import LanguageContext from '../LanguageContext'
import { useSearchParams } from 'react-router-dom'

/**
 * Determines whether to display the profile overview or dietary preferences form, while handling redirection for unauthenticated users.
 */
const DietaryProfileManagement: React.FC = () => {
  const { session: solidSession } = useSession()

  const [firebaseUser] = useAuthState(auth)

  const signedInWithSolid = solidSession.info.isLoggedIn

  const signedInWithFirebase = firebaseUser !== null

  const authed = signedInWithSolid || signedInWithFirebase

  const [editProfile, setEditProfile] = useState(false)

  const { setSelectedLanguage } = useContext(LanguageContext)

  const [searchParams] = useSearchParams()
  const locale = searchParams.get('locale')

  useEffect(() => {
    if (locale !== null) {
      setSelectedLanguage(locale)
    }
  })

  if (!authed) {
    return <Navigate to="/login" replace />
  }

  if (editProfile) {
    return <DietaryPreferencesForm setEditProfile={setEditProfile} />
  } else {
    return <ProfileOverview setEditProfile={setEditProfile} />
  }
}

export default DietaryProfileManagement
