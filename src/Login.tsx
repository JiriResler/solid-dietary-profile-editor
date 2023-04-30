import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Login: React.FC = () => {
  return (
    <Container>
      <Row id="welcome-text" className="text-center bg-info">
        <Col className="h1">Welcome to the Dietary profile editor</Col>
      </Row>

      <Row id="log-in-segment" className="position-absolute top-50 start-50 translate-middle mx-auto w-100 text-center bg-info">
        <h4>Please log in via your Solid identity provider</h4>
        <Col xs={12} md={6} className="border ">
          <select>
            <option value="someOption">solidcommunity.net</option>
            <option value="otherOption">Other option</option>
          </select>
        </Col>
        <Col xs={12} md={6} className="border">
          <button>Log in</button>
        </Col>
        <h6>What is Solid and how do I log in?</h6>
      </Row>

      <Row id="select-language" className="position-absolute bottom-0 start-0 bg-warning">
        <Col className="border">
          <select>
            <option value="selectLanguage">Select language</option>
            <option value="option">Option</option>
          </select>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;