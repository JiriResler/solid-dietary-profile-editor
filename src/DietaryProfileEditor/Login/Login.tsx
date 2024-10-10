import { useContext } from 'react'
import Form from 'react-bootstrap/Form'
import LanguageContext from '../LanguageContext'
import './Login.css'
import SelectProvider from './SelectProvider/SelectProvider'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSession } from '@inrupt/solid-ui-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'
import { auth } from '../../firebase'
import Stack from 'react-bootstrap/Stack'

const Login: React.FC = () => {
  const { session: solidSession } = useSession()

  const [firebaseUser] = useAuthState(auth)

  const authed = solidSession.info.isLoggedIn || firebaseUser !== null

  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)

  const [showAboutModal, setShowAboutModal] = useState(false)

  function setLanguageContext(language: string) {
    if (language === 'English') {
      setSelectedLanguage('en')
    }

    if (language === 'Slovensky') {
      setSelectedLanguage('sk')
    }

    // if (language === 'Česky') {
    //   setSelectedLanguage('cs')
    // }

    return
  }

  function languageFullName(locale: string) {
    if (locale === 'en') {
      return 'English'
    }

    if (locale === 'sk') {
      return 'Slovensky'
    }

    // if (locale === 'cs') {
    //   return 'Česky'
    // }

    return
  }

  if (authed) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <div>
        <Modal
          show={showAboutModal}
          onHide={() => setShowAboutModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowAboutModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Row className="d-none d-lg-flex login-screen-row">
          <Col md={7} className="position-relative">
            <Stack className="w-75 text-center position-absolute top-50 start-50 translate-middle">
              <h2 className="w-50 mx-auto">
                <FormattedMessage
                  id="welcomeToTheApplication"
                  defaultMessage="Welcome to the Dietary Profile Editor"
                />
              </h2>

              <img
                className="application-logo mt-1"
                src="images/app_logo.svg"
                alt="application_logo"
              />

              <h4 className="w-50 mx-auto">
                <FormattedMessage
                  id="manageYourProfileLoginScreenHeading"
                  defaultMessage="Manage your dietary preferences"
                />
              </h4>
            </Stack>

            <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3">
              <span
                className="clickable-text"
                onClick={() => setShowAboutModal(true)}
              >
                <FormattedMessage
                  id="aboutTheApplication"
                  defaultMessage="About"
                />
              </span>
              <span> | </span>
              <a
                href="https://github.com/JiriResler/solid-dietary-profile-editor"
                target="_blank"
                className="link-without-decoration"
              >
                <FormattedMessage
                  id="sourceCode"
                  defaultMessage="Source code"
                />
              </a>
              <span> | </span>
              <span>
                <FormattedMessage id="createdBy" defaultMessage="Created by" />{' '}
                Jiří Resler
              </span>
            </div>
          </Col>

          <Col md={5} className="select-provider-login-col position-relative">
            <Card className="select-provider-card position-absolute top-50 start-50 translate-middle">
              <Card.Body>
                <SelectProvider />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      <div className="d-lg-none">
        <SelectProvider />
      </div>

      <div className="position-absolute bottom-0 start-0 ms-3 mb-3">
        <Form.Select
          value={languageFullName(selectedLanguage)}
          onChange={(e) => setLanguageContext(e.target.value)}
        >
          <option key="en">English</option>
          <option key="sk">Slovensky</option>
          {/* <option key="cs">Česky</option> */}
        </Form.Select>
      </div>
    </>
  )
}

export default Login
