import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import SelectSolidProvider from './SelectSolidProvider/SelectSolidProvider'
import { useState } from 'react'
import './SelectProvider.css'
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
import LoginErrorModal from './LoginErrorModal'

/**
 * Allows the user to select an identity provider to sign in with and triggers the authentication process.
 */
const SelectProvider: React.FC = () => {
  const [loginWithSolid, setLoginWithSolid] = useState(false)

  const [showAboutSolidModal, setShowAboutSolidModal] = useState(false)

  const { login } = useLogin()

  const [facebokLoginInProgress, setFacebokLoginInProgress] = useState(false)

  const [googleLoginInProgress, setGoogleLoginInProgress] = useState(false)

  const intl = useIntl()

  const navigate = useNavigate()

  const solidDescriptionText = `
    <b>Solid</b> lets you control where your data is stored and who can access it. To get started, create a WebID with a Solid provider. You can also sign in using Google or Facebook, with your data stored on their servers. You can switch to Solid later without losing your data. Learn more on the Solid's <a>project website</a>.
  `

  const firebaseLoginErrorMessage = intl.formatMessage({
    id: 'loginFirebaseErrorMessage',
    defaultMessage:
      'Login failed. The reason may be that you are not connected to internet, the login process was cancelled or there is an issue with the selected provider.',
  })

  /**
   * Activates the Facebook sign in flow and signs in the user to Firebase with obtained access token.
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

          throw error
        })
    } catch (error) {
      console.error(error)
    } finally {
      setFacebokLoginInProgress(false)
    }
  }

  /**
   * Activates Google sign in flow.
   */
  function handleGoogleLogin() {
    setGoogleLoginInProgress(true)

    signInWithPopup(auth, google)
      .then(() => navigate('/'))
      .catch((error) => {
        console.error(error)
      })
      .finally(() => setGoogleLoginInProgress(false))
  }

  if (loginWithSolid) {
    return <SelectSolidProvider setLoginWithSolid={setLoginWithSolid} />
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

      <LoginErrorModal />

      <Stack
        gap={3}
        className="select-provider-stack position-absolute top-50 start-50 translate-middle text-center pb-1"
      >
        <span className="select-provider-heading">
          <FormattedMessage
            id="selectIdentityProvider"
            defaultMessage="Select an identity provider"
          />
        </span>

        <Button
          onClick={() => {
            setLoginWithSolid(true)
          }}
          className="login-screen-button solid-button text-start"
        >
          <img
            src="images/logo_solid.svg"
            alt="Solid logo"
            className="solid-icon"
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
          <FormattedMessage id="whatIsSolid" defaultMessage="What is Solid?" />
        </div>

        <div className="providers-divider">
          <span>
            <FormattedMessage id="signInDivider" defaultMessage="or" />
          </span>
        </div>

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
    </>
  )
}

export default SelectProvider
