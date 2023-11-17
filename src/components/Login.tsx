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
import './Login.css'

const Login: React.FC = () => {
  // const [selectedLoginMethod, setSelectedLoginMethod] = useState('none')
  const [show, setShow] = useState(false)
  const { language, setLanguage } = useContext(LanguageContext)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Navbar.Brand className="ms-3 fs-6">
          <Link className="about-link" to="../about">
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

      <div className="app-name mt-5 text-center">
        <h1>
          <FormattedMessage
            id="app_name"
            defaultMessage={'Dietary profile editor'}
          />
        </h1>
      </div>

      <Stack gap={3} className="mt-5 sign-in-stack text-center mx-auto">
        <h5>
          <FormattedMessage
            id="sign_in_via_provider"
            defaultMessage={'Please sign in via an identity provider'}
          />
        </h5>
        <Button className="solid-button text-start mx-auto">
          <img
            src="images/logo_solid.svg"
            alt="Solid project logo"
            className="login-provider-icon"
          />
          <span className="ms-3">Solid</span>
        </Button>
        <Button className="facebook-button text-start mx-auto">
          <img
            src="images/logo_facebook.svg"
            alt="Facebook logo"
            className="login-provider-icon"
          />
          <span className="ms-3">Facebook</span>
        </Button>
        <Button className="google-button text-start mx-auto">
          <img
            src="images/logo_google.svg"
            alt="Google logo"
            className="login-provider-icon"
          />
          <span className="ms-3">Google</span>
        </Button>
        <button>Apple</button>
        <div onClick={handleShow} className="choose-provider-question">
          <FormattedMessage
            id="which_provider_to_choose"
            defaultMessage={'Which provider should I choose?'}
          />
        </div>
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
