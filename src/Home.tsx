import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import { FormattedMessage } from 'react-intl'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import LogInSolid from './LogInSolid'
import LogInEmail from './LogInEmail'

type Props = {
  selectedLanguage: string
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>
}

const Home: React.FC<Props> = ({ selectedLanguage, setSelectedLanguage }) => {
  const [selectedLoginMethod, setSelectedLoginMethod] = useState<string>('none')

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Navbar.Brand className="ms-3 fs-6">
          <Link className="navbar-link about-link " to="about">
            <FormattedMessage id="about_application" defaultMessage={'About'} />
          </Link>
        </Navbar.Brand>
      </Navbar>

      <Container className="log-in-container">
        <Row className="h-100 align-items-center text-center">
          <Col>
            <h1>
              <FormattedMessage
                id="app_name"
                defaultMessage={'Dietary profile editor'}
              />
            </h1>
          </Col>
        </Row>

        <Row>
          <Col>
            {selectedLoginMethod === 'none' && (
              <Stack gap={2} className="text-center fade-in">
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

                <Row className="mx-auto">
                  <Col>
                    <Stack direction="horizontal" gap={4} className="pe-5">
                      <img
                        src="images/logo_solid.svg"
                        alt="Solid project logo"
                        className="login-provider-icon "
                      />
                      <Button
                        onClick={() => {
                          setSelectedLoginMethod('solid')
                        }}
                        className="solid-button text-start"
                      >
                        Solid WebID
                      </Button>
                    </Stack>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormattedMessage id="or" defaultMessage={'or'} />
                  </Col>
                </Row>

                <Row className="mx-auto">
                  <Col>
                    <Stack direction="horizontal" gap={4} className="pe-5">
                      <img
                        src="images/envelope-at.svg"
                        alt="Envelope icon"
                        className="login-provider-icon"
                      />
                      <Button
                        onClick={() => {
                          setSelectedLoginMethod('email')
                        }}
                        className="text-start sign-in-with-email-button"
                      >
                        <FormattedMessage
                          id="email_and_password"
                          defaultMessage={'Email and password'}
                        />
                      </Button>
                    </Stack>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col>
                    <Link
                      className="link-no-decoration"
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
            )}

            {selectedLoginMethod === 'solid' && (
              <div className="fade-in">
                <LogInSolid />
                <button
                  onClick={() => {
                    setSelectedLoginMethod('none')
                  }}
                >
                  <FormattedMessage id="go_back" defaultMessage={'Go back'} />
                </button>
              </div>
            )}

            {selectedLoginMethod === 'email' && (
              <div className="fade-in">
                <LogInEmail />
                <button
                  onClick={() => {
                    setSelectedLoginMethod('none')
                  }}
                >
                  <FormattedMessage id="go_back" defaultMessage={'Go back'} />
                </button>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      <div className="position-absolute bottom-0 start-0 ms-3 mb-3">
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
