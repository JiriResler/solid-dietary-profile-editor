import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import LanguageContext from '../LanguageContext'
import './LoginScreen.css'
import SelectProvider from './SelectProvider'

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
      <Navbar bg="primary" data-bs-theme="dark">
        <Navbar.Brand className="ms-3 fs-6">
          <Link className="about-link" to="../about">
            <FormattedMessage id="about_application" defaultMessage={'About'} />
          </Link>
        </Navbar.Brand>
      </Navbar>

      <div className="app-name text-center mt-3 mx-auto">
        <h3>
          <FormattedMessage
            id="app_name"
            defaultMessage={'Personal Eating Preferences Profile Editor'}
          />
        </h3>
      </div>

      <div className="application-logo mt-3 mx-auto">
        <img src="images/apple.svg" alt="application_logo" />
      </div>

      <SelectProvider />

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
