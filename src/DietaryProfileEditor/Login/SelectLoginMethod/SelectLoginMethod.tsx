import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import LoginSolid from './LoginSolid/LoginSolid'
import { useState } from 'react'
import './SelectLoginMethod.css'
import { FormattedMessage, useIntl } from 'react-intl'
import Stack from 'react-bootstrap/Stack'
import { auth, google } from '../../../firebase'
import {
  signInWithCredential,
  FacebookAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useLogin } from 'react-facebook'
import Spinner from 'react-bootstrap/Spinner'
import ErrorModal from '../../ErrorModal/ErrorModal'
import Fade from '@mui/material/Fade'
import LoginEmailAndPassword from './LoginEmailAndPassword/LoginEmailAndPassword'

/**
 * Allows the user to choose which authentication method to sign in with.
 */
const SelectLoginMethod: React.FC = () => {
  const [loginWithSolid, setLoginWithSolid] = useState(false)

  const [loginWithEmailAndPassword, setLoginWithEmailAndPassword] =
    useState(false)

  const [showAboutSolidModal, setShowAboutSolidModal] = useState(false)

  const { login } = useLogin()

  const [facebokLoginInProgress, setFacebokLoginInProgress] = useState(false)

  const [googleLoginInProgress, setGoogleLoginInProgress] = useState(false)

  const [loginCausedError, setLoginCausedError] = useState(false)

  const [loginErrorMessage, setLoginErrorMessage] = useState('')

  const intl = useIntl()

  const navigate = useNavigate()

  const [allowFadeAnimation, setAllowFadeAnimation] = useState(false)

  const solidDescriptionText = `
    <b>Solid</b> lets you control where your data is stored and who can access it. To get started, create a WebID with a Solid provider. You can also sign in using Google or Facebook, with your data stored on their servers. You can switch to Solid later without losing your data. Learn more on the Solid's <a>project website</a>.
  `

  /**
   * Activates the Facebook sign in flow and signs in the user to Firebase with the obtained access token.
   */
  async function handleFacebookLogin() {
    try {
      setFacebokLoginInProgress(true)

      const loginResponse = await login({
        scope: 'email',
      })

      // Build Firebase credential with the Facebook auth token.
      const credential = FacebookAuthProvider.credential(
        loginResponse.authResponse.accessToken,
      )

      signInWithCredential(auth, credential)
        .then(() => {
          navigate('/')
        })
        .catch((error) => {
          const errorMessage = intl.formatMessage({
            id: 'firebaseLoginErrorMessageFacebook',
            defaultMessage:
              'Login failed because there is an issue with the backend authentication service.',
          })

          setLoginErrorMessage(errorMessage)
          setLoginCausedError(true)

          throw error
        })
    } catch (error) {
      // No need to show ErrorModal as the Facebook popup window itself shows an error message to the user.
      console.error(error)
    } finally {
      setFacebokLoginInProgress(false)
    }
  }

  /**
   * Activates the Google sign in flow.
   */
  function handleGoogleLogin() {
    setGoogleLoginInProgress(true)

    signInWithPopup(auth, google)
      .then(() => navigate('/'))
      .catch((error) => {
        console.error(error)

        const errorMessage = intl.formatMessage({
          id: 'firebaseLoginErrorMessageGoogle',
          defaultMessage:
            'Login failed because either you are not connected to the internet or there is an issue with the backend authentication service.',
        })

        setLoginErrorMessage(errorMessage)
        setLoginCausedError(true)
      })
      .finally(() => setGoogleLoginInProgress(false))
  }

  if (loginWithSolid) {
    return <LoginSolid setLoginWithSolid={setLoginWithSolid} />
  }

  if (loginWithEmailAndPassword) {
    return (
      <LoginEmailAndPassword
        setLoginWithEmailAndPassword={setLoginWithEmailAndPassword}
      />
    )
  }

  return (
    <>
      <Modal
        size="lg"
        centered
        show={showAboutSolidModal}
        onHide={() => {
          setShowAboutSolidModal(false)
        }}
      >
        <Modal.Body>
          <FormattedMessage
            id="solidDescription"
            defaultMessage={solidDescriptionText}
            values={{
              b: (chunks) => <b>{chunks}</b>,
              a: (chunks) => (
                <a target="_blank" href="https://solidproject.org/">
                  {chunks}
                </a>
              ),
            }}
          />{' '}
          <br />
          <div className="mt-3 text-end">
            <Button
              variant="secondary"
              onClick={() => {
                setShowAboutSolidModal(false)
              }}
            >
              <FormattedMessage id="closeModal" defaultMessage="Close" />
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <ErrorModal
        show={loginCausedError}
        setShow={setLoginCausedError}
        titleMessage={intl.formatMessage({
          id: 'loginFailed',
          defaultMessage: 'Login failed',
        })}
        bodyMessage={loginErrorMessage}
      />

      <Fade in={true} appear={allowFadeAnimation} timeout={500}>
        <Stack
          gap={3}
          className="select-login-method-stack position-absolute top-50 start-50 translate-middle text-center pb-1"
        >
          <span className="select-login-method-heading">
            <FormattedMessage
              id="selectSignInMethod"
              defaultMessage="Select a sign in method"
            />
          </span>

          <Button
            onClick={() => {
              setLoginWithSolid(true)
              setAllowFadeAnimation(true)
            }}
            className="login-screen-button solid-button text-start"
          >
            <img
              src="images/logo_solid.svg"
              alt="Solid logo"
              className="solid-icon"
              draggable="false"
            />
            <span className="ms-3">
              <FormattedMessage
                id="signInWithSolid"
                defaultMessage="Sign in with Solid"
              />
            </span>
          </Button>

          <div
            onClick={() => {
              setShowAboutSolidModal(true)
            }}
            className="clickable-text w-50 mt-1 mx-auto"
          >
            <FormattedMessage
              id="whatIsSolid"
              defaultMessage="What is Solid?"
            />
          </div>

          <div className="login-screen-divider">
            <span>
              <FormattedMessage id="signInDivider" defaultMessage="or" />
            </span>
          </div>

          <Button
            className="login-screen-button app-secondary-color-button"
            onClick={() => {
              setLoginWithEmailAndPassword(true)
              setAllowFadeAnimation(true)
            }}
          >
            <div className="text-start">
              <img
                src="images/envelope-fill.svg"
                alt="Email envelope"
                className="provider-icon ms-1"
                draggable="false"
              />
              <span className="ms-3">
                <FormattedMessage
                  id="emailAndPassword"
                  defaultMessage="Email and password"
                />
              </span>
            </div>
          </Button>

          <Button
            onClick={() => void handleFacebookLogin()}
            className="login-screen-button facebook-button"
          >
            {!facebokLoginInProgress ? (
              <div className="text-start">
                <img
                  src="images/facebook_round_white_icon.svg"
                  alt="Facebook logo"
                  className="provider-icon ms-1"
                  draggable="false"
                />

                <span className="ms-3">
                  <FormattedMessage
                    id="signInWithFacebook"
                    defaultMessage="Sign in with Facebook"
                  />
                </span>
              </div>
            ) : (
              <Spinner animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Button>

          <Button
            onClick={() => handleGoogleLogin()}
            className="login-screen-button google-button"
          >
            {!googleLoginInProgress ? (
              <div className="text-start">
                <img
                  src="images/google_g_logo.svg"
                  alt="Google logo"
                  className="provider-icon ms-1"
                  draggable="false"
                />

                <span className="ms-3">
                  <FormattedMessage
                    id="signInWithGoogle"
                    defaultMessage="Sign in with Google"
                  />
                </span>
              </div>
            ) : (
              <Spinner animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Button>
        </Stack>
      </Fade>
    </>
  )
}

export default SelectLoginMethod
