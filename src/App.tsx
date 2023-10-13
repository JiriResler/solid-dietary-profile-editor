import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Navbar from 'react-bootstrap/Navbar'

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
        Body
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
