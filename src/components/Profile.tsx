import { useState } from 'react'
import CreateProfile from './CreateProfile/CreateProfile'
import { LoginMethod } from './loginMethodEnum'

type Props = {
  loginMethod: LoginMethod
}

const Profile: React.FC<Props> = ({ loginMethod }) => {
  const [userProfileExists] = useState(false)

  if (!userProfileExists) {
    return <CreateProfile loginMethod={loginMethod} />
  }

  return (
    <div>
      <h1>Profile overview</h1>
    </div>
  )
}

export default Profile
