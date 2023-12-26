import { useState } from 'react'
import CreateProfile from './CreateProfile/CreateProfile'
import { LoginMethod } from './loginMethodEnum'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'

type Props = {
  loginMethod: LoginMethod
}

const Profile: React.FC<Props> = ({ loginMethod }) => {
  const [userProfileExists] = useState(true)
  const [showSidebar, setShowSidebar] = useState(false)

  if (!userProfileExists) {
    return <CreateProfile loginMethod={loginMethod} />
  }

  return (
    <>
      <h1 className="mt-3">Profile overview</h1>

      <Button
        variant="primary"
        onClick={() => setShowSidebar(true)}
        className="position-absolute top-0 end-0 mt-3 me-3"
      >
        Menu
      </Button>

      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        placement="end"
        className="w-50"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Profile
