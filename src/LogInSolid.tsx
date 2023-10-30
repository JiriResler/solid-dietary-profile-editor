import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

// import { LoginButton } from '@inrupt/solid-ui-react'

import logo from '../public/images/logo_solid.svg'
import { useState } from 'react'

const solidIdProviders: string[] = [
  'https://solidcommunity.net/',
  'https://login.inrupt.com/',
  'https://inrupt.net/',
  'https://solidweb.org/',
]

const LogInSolid: React.FC = () => {
  const identityProviders: string[] = solidIdProviders

  // const { session } = useSession()
  const [selectedOption, setSelectedOption] = useState(
    'Select an identity provider',
  )

  return (
    <Container>
      <Row>
        <Col className="text-center mt-4">
          <img src={logo} alt="Solid logo" width="175" />
        </Col>
      </Row>

      <Row>
        <Col className="text-center mt-3 h1">
          <b>Solid dietary profile editor</b>
        </Col>
      </Row>

      <Row>
        <Col className="text-center mt-3 h4">
          Specify your allergies, diets and what foods and drinks you like or
          dislike.
        </Col>
      </Row>

      <Row>
        <Col className="text-center mt-4 h5">
          Please log in via your Solid identity provider
        </Col>
      </Row>

      <Row className="align-items-center">
        <Col xs={12} md={{ span: 3, offset: 4 }} className="text-center mt-3">
          <Form.Select
            size="lg"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option key="initialOption">Select an identity provider</option>
            {identityProviders.map((opt) => {
              return <option key={opt}>{opt}</option>
            })}
          </Form.Select>
        </Col>

        <Col xs={12} md={{ span: 2, offset: 0 }} className="text-center mt-2">
          <button>Log in</button>
          {/* <LoginButton
            oidcIssuer={selectedOption}
            redirectUrl={window.location.href}
          >
            <Button
              variant="primary"
              size="lg"
              disabled={selectedOption === 'Select an identity provider'}
            >
              Log in
            </Button>
          </LoginButton> */}
        </Col>
      </Row>

      <Row>
        <Col className="text-center mt-4">
          <a
            href="https://solidproject.org"
            target="_blank"
            style={{ textDecoration: 'none' }}
          >
            What is Solid?
          </a>
        </Col>
      </Row>
    </Container>
  )
}

export default LogInSolid
