import { useState } from 'react'
import CreateProfile from './CreateProfile/CreateProfile'
import { LoginMethod } from './loginMethodEnum'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import './Profile.css'

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
        className="position-absolute top-0 end-0 mt-4 me-4"
      >
        <img src="images/hamburger_menu_icon.svg" className="hamburger-icon" />
      </Button>

      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        placement="end"
        className="sidebar-menu"
      >
        <Offcanvas.Header className="border">
          <Offcanvas.Title>
            <img
              className="w-25 mb-2"
              src="images/app_logo.svg"
              alt="application_logo"
            />
            <span className="ms-4">Menu</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mt-2">Edit profile</div>
          <div className="mt-4">Select Solid Pod</div>
          <div className="mt-4">Import profile</div>
          <div className="mt-4">Export profile</div>
          <div className="mt-4">Log out</div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Profile
