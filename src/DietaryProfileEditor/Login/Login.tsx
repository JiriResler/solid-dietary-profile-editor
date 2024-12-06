import { useContext } from 'react'
import Form from 'react-bootstrap/Form'
import LanguageContext from '../LanguageContext'
import './Login.css'
import SelectLoginMethod from './SelectLoginMethod/SelectLoginMethod'
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

/**
 * Displays the login screen and allows the user to switch application language.
 */
const Login: React.FC = () => {
  const { session: solidSession } = useSession()

  const [firebaseUser] = useAuthState(auth)

  const authed = solidSession.info.isLoggedIn || firebaseUser !== null

  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)

  const [showAboutApplicationModal, setShowAboutApplicationModal] =
    useState(false)

  const aboutApplicationText =
    '<b>Dietary Profile Editor</b> is designed for people who enjoy dining out but have specific dietary needs, such as food allergies. It allows you to save and manage your dietary preferences. What sets it apart is the option to use <b>Solid</b>, a technology that stores your data in a decentralized way, giving you full control over who can access it, ensuring a higher level of privacy.'

  /**
   * Sets the application language.
   */
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

  /**
   * Returns full language name based on the provided locale.
   */
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
      <div className="d-none d-lg-flex">
        <Modal
          show={showAboutApplicationModal}
          onHide={() => setShowAboutApplicationModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <FormattedMessage
                id="aboutApplicationTitle"
                defaultMessage="About the application"
              />
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FormattedMessage
              id="aboutApplicationBody"
              defaultMessage={aboutApplicationText}
              values={{
                b: (chunks) => <b>{chunks}</b>,
              }}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowAboutApplicationModal(false)}
            >
              <FormattedMessage id="closeModal" defaultMessage="Close" />
            </Button>
          </Modal.Footer>
        </Modal>

        <Row className="login-screen-row">
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
                onClick={() => setShowAboutApplicationModal(true)}
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
                className="link-without-decoration clickable-text"
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

          <Col md={5} className="choose-sign-in-method-col position-relative">
            <Card className="choose-sign-in-method-card position-absolute top-50 start-50 translate-middle">
              <Card.Body>
                <SelectLoginMethod />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      <div className="d-lg-none">
        <SelectLoginMethod />
      </div>

      <div className="position-absolute bottom-0 start-0 ms-3 mb-3">
        <Form.Select
          value={languageFullName(selectedLanguage)}
          onChange={(e) => setLanguageContext(e.target.value)}
          className="form-control"
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
