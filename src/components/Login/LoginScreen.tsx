import { useContext } from 'react'
import Form from 'react-bootstrap/Form'
import LanguageContext from '../../LanguageContext'
import './LoginScreen.css'
import SelectProvider from './SelectProvider'
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const LoginScreen: React.FC = () => {
  const { language, setLanguage } = useContext(LanguageContext)

  function setLanguageShorthand(languageLong: string) {
    if (languageLong === 'English') {
      setLanguage('en')
    }

    if (languageLong === 'Slovensky') {
      setLanguage('sk')
    }

    if (languageLong === 'Česky') {
      setLanguage('cs')
    }

    return
  }

  function languageFullName(languageShorthand: string) {
    if (languageShorthand === 'en') {
      return 'English'
    }

    if (languageShorthand === 'sk') {
      return 'Slovensky'
    }

    if (languageShorthand === 'cs') {
      return 'Česky'
    }

    return
  }

  return (
    <>
      <Row className="large-screen-login-row d-none d-md-flex">
        <Col md={8}>1 of 2</Col>
        <Col className="select-provider-login-col">2 of 2</Col>
      </Row>

      <Stack
        gap={3}
        className="select-provider-stack d-md-none text-center mx-auto"
      >
        <img
          className="application-logo"
          src="images/app_logo.svg"
          alt="application_logo"
        />

        <h5>Manage your personal eating preferences profile</h5>

        <SelectProvider />
      </Stack>

      <div className="position-absolute bottom-0 start-0 ms-3 mb-3">
        <Form.Select
          value={languageFullName(language)}
          onChange={(e) => setLanguageShorthand(e.target.value)}
        >
          <option key="en">English</option>
          <option key="sk">Slovensky</option>
          <option key="cs">Česky</option>
        </Form.Select>
      </div>
    </>
  )
}

export default LoginScreen
