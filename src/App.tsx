import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import './styles/LoginScreen.css'

const App: React.FC = () => {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Navbar.Brand href="#home" className="ms-3 fs-6">
          About
        </Navbar.Brand>
      </Navbar>

      <h1 className="text-center app-name-row translate-middle">
        Dietary profile editor
      </h1>

      <Container>
        <Row className="sign-in-row position-absolute top-50 start-50 translate-middle ">
          <Col>
            <Stack gap={2} className="text-center">
              <Row className="pb-2">
                <Col>
                  <h5>Sign in with</h5>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs={3}>
                  <img
                    src="images/logo_solid.svg"
                    alt="Solid project logo"
                    className="login-provider-icon"
                  />
                </Col>
                <Col className="text-start">
                  <Button className="solid-button text-start">
                    Solid WebID
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>or</Col>
              </Row>
              <Row className="align-items-center">
                <Col xs={3}>
                  <img
                    src="images/envelope-at.svg"
                    alt="Envelope icon"
                    className="login-provider-icon me-"
                  />
                </Col>
                <Col className="text-start">
                  <Button className="text-start sign-in-with-email-button">
                    Email and password
                  </Button>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <a
                    href="/home"
                    className="text-center link-underline link-underline-opacity-0"
                  >
                    What is the difference?
                  </a>
                </Col>
              </Row>
            </Stack>
          </Col>
        </Row>
      </Container>

      <div className="position-absolute bottom-0 end-0 me-3 mb-3">
        <select>
          <option value="selectLanguage">Select language</option>
          <option value="option">Option</option>
        </select>
      </div>
    </>
  )
}

export default App
