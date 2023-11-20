import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import { FormattedMessage } from 'react-intl'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import { useContext } from 'react'
// import LogInSolid from './LogInSolid'
import LanguageContext from '../LanguageContext'
import './Login.css'

const Login: React.FC = () => {
  // const [selectedLoginMethod, setSelectedLoginMethod] = useState('none')
  const [showMoreProviders, setShowMoreProviders] = useState(false)
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

      <div className="app-name mt-5 text-center">
        <h1>
          <FormattedMessage
            id="app_name"
            defaultMessage={'Personal Eating Preferences Profile Editor'}
          />
        </h1>
      </div>

      <div className="mt-5 mx-auto application-logo">
        <img src="images/apple.svg" alt="application logo" />
      </div>

      <Stack gap={3} className="mt-5 sign-in-stack text-center mx-auto">
        <h5>
          <FormattedMessage
            id="sign_in_via_provider"
            defaultMessage={'Please sign in via an identity provider'}
          />
        </h5>

        <Button className="provider-button solid-button text-start mx-auto">
          <img
            src="images/logo_solid.svg"
            alt="Solid logo"
            className="provider-icon"
          />
          <span className="ms-3">Solid</span>
        </Button>

        <span>What is Solid?</span>

        <span
          onClick={() => {
            setShowMoreProviders(!showMoreProviders)
          }}
        >
          More providers {/* Chevron icon */}
          {!showMoreProviders && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          )}
          {showMoreProviders && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-up"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
              />
            </svg>
          )}
        </span>

        {showMoreProviders && (
          <>
            <Button className="provider-button facebook-button text-start mx-auto">
              <img
                src="images/facebook_round_white_icon.svg"
                alt="Facebook logo"
                className="provider-icon"
              />
              <span className="ms-3">Facebook</span>
            </Button>
            <Button className="provider-button google-button text-start mx-auto">
              <img
                src="images/google_g_logo.svg"
                alt="Google logo"
                className="provider-icon"
              />
              <span className="ms-3">Google</span>
            </Button>
            <Button className="provider-button apple-button text-start mx-auto">
              <img
                src="images/apple_logo_white.svg"
                alt="Apple logo"
                className="provider-icon"
              />
              <span className="ms-3">Apple</span>
            </Button>
          </>
        )}
      </Stack>

      <div className="position-absolute bottom-0 start-0 ms-3 mb-3">
        <Form.Select
          value={languageFullName(language)}
          onChange={(e) => setLanguageShorthand(e.target.value)}
          size="lg"
        >
          <option key="en">English</option>
          <option key="sk">Slovensky</option>
          <option key="cs">Česky</option>
        </Form.Select>
      </div>
    </>
  )
}

export default Login
