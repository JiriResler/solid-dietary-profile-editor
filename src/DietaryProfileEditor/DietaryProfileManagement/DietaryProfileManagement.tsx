import React, { useState } from 'react'
import ProfileOverview from './ProfileOverview/ProfileOverview'

const DietaryProfileManagement: React.FC = () => {
  const [userProfileExists] = useState(true)

  if (userProfileExists) {
    return <ProfileOverview />
  }
}

export default DietaryProfileManagement
