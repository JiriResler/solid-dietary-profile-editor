import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Navbar from 'react-bootstrap/Navbar'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import './styles/LoginScreen.css'
import Col from 'react-bootstrap/Col'

const App: React.FC = () => {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Navbar.Brand href="#home" className="ms-3 fs-6">
          About
        </Navbar.Brand>
      </Navbar>

      <Container>
        <Row className="position-absolute top-50 start-50 translate-middle ">
          <Col>
            <Stack gap={3} className="text-center">
              <h2>Dietary profile editor</h2>
              <h6>Choose a method for signing in</h6>
              <Row className="align-items-center">
                <Col className="text-end">
                  <img
                    src="images/logo_solid.svg"
                    alt="Solid project logo"
                    className="solid-logo"
                  />
                </Col>
                <Col xs={8} className="text-start">
                  <Button className="solid-button">Solid WebID</Button>
                </Col>
              </Row>
              <Button variant="outline-secondary">Google account</Button>
              <a
                href="/home"
                className="text-center link-underline link-underline-opacity-0"
              >
                What is the difference?
              </a>
            </Stack>
          </Col>
        </Row>

        <Row className="position-absolute bottom-0 end-0 me-auto">
          <select>
            <option value="selectLanguage">Select language</option>
            <option value="option">Option</option>
          </select>
        </Row>
      </Container>
    </>
  )
}

export default App
