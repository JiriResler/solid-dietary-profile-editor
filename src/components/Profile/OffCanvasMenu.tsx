import { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useSession } from '@inrupt/solid-ui-react'

type Props = {
  setShowExportProfileModal: React.Dispatch<React.SetStateAction<boolean>>
  setShowImportProfileModal: React.Dispatch<React.SetStateAction<boolean>>
}

const OffCanvasMenu: React.FC<Props> = ({setShowExportProfileModal, setShowImportProfileModal}) => {
  const [showSidebar, setShowSidebar] = useState(false)

  const { session } = useSession()

  return (
    <>
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
          <div className="mt-4" onClick={()=>{
            setShowSidebar(false)
            setShowImportProfileModal(true)
          }}>Import profile</div>
          <div className="mt-4" onClick={()=>{
            setShowSidebar(false)
            setShowExportProfileModal(true)
            }}>Export profile</div>
          <div
            onClick={() => {
              signOut(auth).catch((error: Error) => {
                console.log(error.message)
              })

              session.logout().catch((error: Error) => {
                console.log(error.message)
              })
            }}
            className="mt-4"
          >
            Log out
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default OffCanvasMenu
