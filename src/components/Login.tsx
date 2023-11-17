import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import { FormattedMessage } from 'react-intl'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import { useContext } from 'react'
// import LogInSolid from './LogInSolid'
import Modal from 'react-bootstrap/Modal'
import LanguageContext from '../LanguageContext'

const Login: React.FC = () => {
  // const [selectedLoginMethod, setSelectedLoginMethod] = useState('none')
  const [show, setShow] = useState(false)
  const { language, setLanguage } = useContext(LanguageContext)

  const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Navbar.Brand className="ms-3 fs-6">
          <Link className="navbar-link about-link " to="../about">
            <FormattedMessage id="about_application" defaultMessage={'About'} />
          </Link>
        </Navbar.Brand>
      </Navbar>

      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Body>
          Woohoo, you are reading this text in a modal! <br />
          <div className="mt-3 text-end">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <div className="h-100 align-items-center text-center">
        <h1>
          <FormattedMessage
            id="app_name"
            defaultMessage={'Dietary profile editor'}
          />
        </h1>
      </div>

      <Stack gap={2}>
        <div className="">
          <h5>
            <FormattedMessage
              id="sign_in_via_provider"
              defaultMessage={'Please sign in via an identity provider'}
            />
          </h5>
        </div>
        <div>Which provider should I use?</div>
        <button>Solid</button>
        <button>Facebook</button>
        <button>Google</button>
        <button>Apple</button>
      </Stack>

      <div className="position-absolute bottom-0 start-0 ms-3 mb-3">
        <Form.Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          size="lg"
        >
          <option key="en">en</option>
          <option key="sk">sk</option>
          <option key="cs">cs</option>
        </Form.Select>
      </div>
    </>
  )
}

export default Login
