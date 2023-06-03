import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
          <img src={logo} alt="Solid logo" width="175"/>
        </Col>
      </Row>

      <Row>
        <Col className="text-center mt-4 h5">
          Please log in via your Solid identity provider
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={{ span: 3, offset: 4 }} className="text-center mt-2">
          <select>
            <option value="someOption">https://solidweb.org/</option>
            <option value="otherOption">Other option</option>
          </select>
        </Col>
        <Col xs={12} md={{ span: 2, offset: 0 }} className="text-center mt-2">
        <LoginButton
          oidcIssuer={'https://solidweb.org/'}
          redirectUrl={window.location.href}
        />
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