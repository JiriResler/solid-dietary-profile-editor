import React, { useState } from 'react'
import ProfileOverview from './ProfileOverview/ProfileOverview'
import './DietaryProfileManagement.css'
import CreateDietaryProfile from './CreateDietaryProfile/CreateDietaryProfile'

const DietaryProfileManagement: React.FC = () => {
  const [userProfileExists] = useState(false)

  if (userProfileExists) {
    return <ProfileOverview />
  } else {
    return <CreateDietaryProfile />
  }
}

export default DietaryProfileManagement
