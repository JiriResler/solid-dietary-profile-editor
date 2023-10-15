import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Navbar from 'react-bootstrap/Navbar'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import './styles/Test.css'

const App: React.FC = () => {
  return (
    <Container fluid className="bg-success">
      <Row>
        <Navbar bg="primary" data-bs-theme="dark">
          <Navbar.Brand href="#home" className="ms-3 fs-6">
            About
          </Navbar.Brand>
        </Navbar>
      </Row>

      <Row className="position-absolute top-50 start-50 translate-middle">
        <Stack gap={3}>
          <h2>Dietary profile editor</h2>
          <h6>Select who you want to trust with your personal data</h6>
          <Button className="box">Trust Solid</Button>
          <Button variant="outline-secondary">Trust Google</Button>
          <a
            href="/home"
            className="text-center link-underline link-underline-opacity-0"
          >
            What is the difference?
          </a>
        </Stack>
      </Row>

      <Row className="position-absolute bottom-0 end-0 me-auto">
        <select>
          <option value="selectLanguage">Select language</option>
          <option value="option">Option</option>
        </select>
      </Row>
    </Container>
  )
}

export default App
