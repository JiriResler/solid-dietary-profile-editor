import './TraditionalProviders.css'
import Button from 'react-bootstrap/Button'
import { auth, facebook, google } from '../../firebase'
import { signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'

const TraditionalProviders: React.FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <Button
        onClick={() => {
          void signInWithRedirect(auth, facebook).then(() => navigate('/'))
        }}
        className="login-screen-button facebook-button text-start"
      >
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
      </Button>

      <Button
        onClick={() => {
          void signInWithPopup(auth, google).then(() => navigate('/'))
        }}
        className="login-screen-button google-button text-start"
      >
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
      </Button>
    </>
  )
}

export default TraditionalProviders
