import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import { FormattedMessage } from 'react-intl'
import Form from 'react-bootstrap/Form'

type HomeProps = {
  selectedLanguage: string
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>
}

const Home: React.FC<HomeProps> = ({
  selectedLanguage,
  setSelectedLanguage,
}) => {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Navbar.Brand className="ms-3 fs-6">
          <Link className="navbar-link" to="about">
            <FormattedMessage id="about_application" defaultMessage={'About'} />
          </Link>
        </Navbar.Brand>
      </Navbar>

      <Container className="bg-secondary container">
        <Row className="bg-success h-75 align-items-center text-center">
          <Col>
            <h1>
              <FormattedMessage
                id="app_name"
                defaultMessage={'Dietary profile editor'}
              />
            </h1>
          </Col>
        </Row>
        <Row className="bg-warning sign-in-row position-absolute top-50 start-50 translate-middle">
          <Col>
            <Stack gap={2} className="text-center">
              <Row className="pb-2">
                <Col>
                  <h5>
                    <FormattedMessage
                      id="sign_in_with"
                      defaultMessage={'Sign in with'}
                    />
                  </h5>
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
                    <Link className="navbar-link" to="log-in-solid">
                      Solid WebID
                    </Link>
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormattedMessage id="or" defaultMessage={'or'} />
                </Col>
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
                    <Link className="navbar-link" to="log-in-email">
                      <FormattedMessage
                        id="email_and_password"
                        defaultMessage={'Email and password'}
                      />
                    </Link>
                  </Button>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Link
                    className="sign-in-method-difference-link"
                    to="sign-in-methods-comparison"
                  >
                    <FormattedMessage
                      id="what_is_the_difference"
                      defaultMessage={'What is the difference?'}
                    />
                  </Link>
                </Col>
              </Row>
            </Stack>
          </Col>
        </Row>
      </Container>

      <div className="position-absolute bottom-0 end-0 me-3 mb-3">
        <Form.Select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option key="en">en</option>
          <option key="sk">sk</option>
          <option key="cs">cs</option>
        </Form.Select>
      </div>
    </>
  )
}

export default Home
