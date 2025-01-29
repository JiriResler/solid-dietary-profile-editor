import React, { useState } from 'react'
import ProfileOverview from './ProfileOverview/ProfileOverview'
import './DietaryProfileManagement.css'
import DietaryPreferencesForm from './DietaryPreferencesForm/DietaryPreferencesForm'
import { useSession } from '@inrupt/solid-ui-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { Navigate } from 'react-router-dom'

const DietaryProfileManagement: React.FC = () => {
  const { session: solidSession } = useSession()

  const [firebaseUser] = useAuthState(auth)

  const authed = solidSession.info.isLoggedIn || firebaseUser !== null

  const [editProfile, setEditProfile] = useState(false)

  if (!authed) {
    return <Navigate to="/login" replace />
  }

  if (editProfile) {
    return <DietaryPreferencesForm />
  } else {
    return <ProfileOverview setEditProfile={setEditProfile} />
  }
}

export default DietaryProfileManagement
