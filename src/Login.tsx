import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {
  LoginButton,
} from "@inrupt/solid-ui-react";

import logo from './logo.svg'

const Login: React.FC = () => {
  // const intl = useIntl();

  return (
    <Container>
      {/* <button onClick={() => onLocaleChanged("en-US")}>
        English
      </button>
      <button onClick={() => onLocaleChanged("sk")}>
        Slovensky
      </button> */}

      <Row>
        <Col className="text-center mt-5 h1">
          <b>Solid dietary profile editor</b>
        </Col>
      </Row>

      <Row>
        <Col className="text-center mt-3 h4">
          Specify your allergies, diets and what foods and drinks you like or dislike.
        </Col>
      </Row>

      <Row>
        <Col className="text-center mt-4">
          <img src={logo} alt="Solid logo" width="175" />
        </Col>
      </Row>

      <Row>
        <Col className="text-center mt-4 h5">
          Please log in via your Solid identity provider
        </Col>
      </Row>

      <Row className="align-items-center">
        <Col xs={12} md={{ span: 5, offset: 2 }} className="text-center mt-3">
          <Form.Select size="lg">
            <option value="solid-web">solidcommunity.net</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>

        <Col xs={12} md={{ span: 2, offset: 0 }} className="text-center mt-3">
          <LoginButton
            oidcIssuer={'https://solidcommunity.net/'}
            redirectUrl={window.location.href}
          >
            <Button variant="primary" size="lg" onClick={() => alert(window.location.href)}>Log in</Button>
          </LoginButton>
        </Col>
      </Row>

      {/* <Row>
        <Col className="text-center mt-3">
          What is Solid and how do I log in?
        </Col>
      </Row> */}

      {/* <Row className="position-absolute bottom-0 start-0">
        <Col className="ms-3 mb-3">
          <select>
            <option value="selectLanguage">Select language</option>
            <option value="option">Option</option>
          </select>
        </Col>
      </Row> */}
    </Container>
  );
};

export default Login;