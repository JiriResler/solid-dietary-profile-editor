import { useContext } from 'react'
import Form from 'react-bootstrap/Form'
import LanguageContext from '../../LanguageContext'
import './LoginScreen.css'
import SelectProvider from './SelectProvider'
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import Container from 'react-bootstrap/Container'

const LoginScreen: React.FC = () => {
  const { language, setLanguage } = useContext(LanguageContext)

  const [showAboutModal, setShowAboutModal] = useState(false)

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
          <Button variant="secondary" onClick={() => setShowAboutModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Container fluid>
        <Row className="login-screen-row d-none d-lg-flex">
          <Col md={7} className="position-relative">
            <Stack className="w-75 text-center position-absolute top-50 start-50 translate-middle">
              <h2>
                Welcome to the personal eating preferences profile editor!
              </h2>
              <img
                className="application-logo"
                src="images/app_logo.svg"
                alt="application_logo"
              />

              <h4 className="mt-3 w-50 mx-auto">
                Manage your eating preferences profile
              </h4>
            </Stack>
            <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3">
              <span
                className="clickable-text"
                onClick={() => setShowAboutModal(true)}
              >
                About
              </span>
              <span> | </span>
              <a
                href="https://github.com/JiriResler/solid-dietary-profile-editor"
                target="_blank"
                className="link-without-decoration"
              >
                Source code
              </a>
              <span> | </span>
              <span>Created by Jiří Resler</span>
            </div>
          </Col>

          <Col md={5} className="select-provider-login-col position-relative">
            <Card className="select-provider-card position-absolute top-50 start-50 translate-middle">
              <Card.Body>
                <Stack
                  gap={3}
                  className="select-provider-stack select-provider-stack-large-screen text-center mx-auto"
                >
                  <SelectProvider />
                </Stack>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Stack
          gap={3}
          className="select-provider-stack select-provider-stack-small-screen position-absolute top-50 start-50 translate-middle pb-5 d-lg-none text-center mx-auto"
        >
          <img
            className="application-logo"
            src="images/app_logo.svg"
            alt="application_logo"
          />

          <h5>Manage your personal eating preferences profile</h5>

          <SelectProvider />
        </Stack>

        <div className="position-absolute bottom-0 start-0 ms-3 mb-3">
          <Form.Select
            value={languageFullName(language)}
            onChange={(e) => setLanguageShorthand(e.target.value)}
          >
            <option key="en">English</option>
            <option key="sk">Slovensky</option>
            <option key="cs">Česky</option>
          </Form.Select>
        </div>
      </Container>
    </>
  )
}

export default LoginScreen
