import React, { useState } from 'react'
import ProfileOverview from './ProfileOverview/ProfileOverview'
import './DietaryProfileManagement.css'

const DietaryProfileManagement: React.FC = () => {
  const [userProfileExists] = useState(true)

  if (userProfileExists) {
    return <ProfileOverview />
  }
}

export default DietaryProfileManagement
