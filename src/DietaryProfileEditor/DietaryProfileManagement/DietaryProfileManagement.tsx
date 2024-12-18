import React, { useState } from 'react'
import ProfileOverview from './ProfileOverview/ProfileOverview'
import './DietaryProfileManagement.css'
import DietaryPreferencesForm from './DietaryPreferencesForm/DietaryPreferencesForm'

const DietaryProfileManagement: React.FC = () => {
  const [userProfileExists] = useState(false)

  if (userProfileExists) {
    return <ProfileOverview />
  } else {
    return <DietaryPreferencesForm />
  }
}

export default DietaryProfileManagement
