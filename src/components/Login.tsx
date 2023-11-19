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
  const [showMoreProviders, setShowMoreProviders] = useState(false)
  const { language, setLanguage } = useContext(LanguageContext)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  function setLanguageShorthand(languageLong: string) {
    if (languageLong === 'English') {
      setLanguage('en')
    }

    if (languageLong === 'Slovensky') {
      setLanguage('sk')
    }

    if (languageLong === 'Česky') {
      setLanguage('cs')
    }

    return
  }

  function languageFullName(languageShorthand: string) {
    if (languageShorthand === 'en') {
      return 'English'
    }

    if (languageShorthand === 'sk') {
      return 'Slovensky'
    }

    if (languageShorthand === 'cs') {
      return 'Česky'
    }

    return
  }

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

        <Button className="provider-button solid-button text-start mx-auto">
          <img
            src="images/logo_solid.svg"
            alt="Solid logo"
            className="provider-icon"
          />
          <span className="ms-3">Solid</span>
        </Button>

        <span>What is Solid?</span>
        <br />
        <span>Other providers v</span>

        {showMoreProviders && (
          <>
            <Button className="provider-button facebook-button text-start mx-auto">
              <img
                src="images/facebook_round_white_icon.svg"
                alt="Facebook logo"
                className="provider-icon"
              />
              <span className="ms-3">Facebook</span>
            </Button>
            <Button className="provider-button google-button text-start mx-auto">
              <img
                src="images/google_g_logo.svg"
                alt="Google logo"
                className="provider-icon"
              />
              <span className="ms-3">Google</span>
            </Button>
            <Button className="provider-button apple-button text-start mx-auto">
              <img
                src="images/apple_logo_white.svg"
                alt="Apple logo"
                className="provider-icon"
              />
              <span className="ms-3">Apple</span>
            </Button>
            <div onClick={handleShow} className="choose-provider-question">
              <FormattedMessage
                id="which_provider_to_choose"
                defaultMessage={'Which provider is the best option?'}
              />
            </div>
          </>
        )}
      </Stack>

      <div className="position-absolute bottom-0 start-0 ms-3 mb-3">
        <Form.Select
          value={languageFullName(language)}
          onChange={(e) => setLanguageShorthand(e.target.value)}
          size="lg"
        >
          <option key="en">English</option>
          <option key="sk">Slovensky</option>
          <option key="cs">Česky</option>
        </Form.Select>
      </div>
    </>
  )
}

export default Login
