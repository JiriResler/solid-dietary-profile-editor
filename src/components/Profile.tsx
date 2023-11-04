import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { LogoutButton } from '@inrupt/solid-ui-react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

type Props = {
  selectedSignInMethod: string
}

const Profile: React.FC<Props> = ({ selectedSignInMethod }) => {
  async function logOut() {
    if (selectedSignInMethod === 'firebase') {
      try {
        await signOut(auth)
        alert('Log out successful')
      } catch {
        alert('Log out failed.')
      }
    }
  }

  return (
    <>
      <Container fluid>
        <p>Logged in with {selectedSignInMethod}</p>
        <Button
          className="mt-3"
          onClick={() => alert('create profile clicked')}
        >
          Create profile
        </Button>
        <br />
        <br />
        <LogoutButton>
          <button
            onClick={() => {
              void logOut()
            }}
          >
            Log out
          </button>
        </LogoutButton>
      </Container>
    </>
  )
}

export default Profile
