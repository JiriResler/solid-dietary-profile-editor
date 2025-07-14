import React, { useState } from 'react'
import ProfileOverview from './ProfileOverview/ProfileOverview'
import './DietaryProfileManagement.css'
import DietaryPreferencesForm from './DietaryPreferencesForm/DietaryPreferencesForm'
import { useSession } from '@inrupt/solid-ui-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { Navigate } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'

/**
 * Determines whether to display the profile overview or dietary preferences form, while handling redirection for unauthenticated users.
 */
const DietaryProfileManagement: React.FC = () => {
  const { session: solidSession } = useSession()

  const [firebaseUser] = useAuthState(auth)

  const signedInWithSolid = solidSession.info.isLoggedIn

  const signedInWithFirebase = firebaseUser !== null

  const authed = signedInWithSolid || signedInWithFirebase

  // const { data } = useQuery({
  //   queryKey: ['getDietaryProfile'],
  //   queryFn: fetchDietaryProfile,
  // })

  const [editProfile, setEditProfile] = useState(false)

  /**
   * Retrieves dietary profile of the signed-in user.
   */
  // function fetchDietaryProfile() {
  //   if (signedInWithSolid) {
  //     return solidSession.info.webId
  //   }

  //   if (signedInWithFirebase) {
  //     return firebaseUser?.email
  //   }
  // }

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
