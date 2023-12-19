import { useState } from 'react'
import CreateProfile from './CreateProfile/CreateProfile'

const Profile: React.FC = () => {
  const [userProfileExists] = useState(false)

  if (!userProfileExists) {
    return <CreateProfile />
  }

  return (
    <div>
      <h1>Profile overview</h1>
    </div>
  )
}

export default Profile
