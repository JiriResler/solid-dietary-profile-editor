import './TraditionalProviders.css'
import Button from 'react-bootstrap/Button'
import { auth, facebook, google } from '../../firebase'
import { signInWithPopup } from 'firebase/auth'

// todo: sign out from all providers before signing in
const TraditionalProviders: React.FC = () => {
  return (
    <>
      <Button
        onClick={() => {
          void signInWithPopup(auth, facebook)
        }}
        className="provider-button facebook-button"
      >
        <img
          src="images/facebook_round_white_icon.svg"
          alt="Facebook logo"
          className="provider-icon border"
        />

        <span className="ms-3">Sign in with Facebook</span>
      </Button>
      <Button
        onClick={() => {
          void signInWithPopup(auth, google)
        }}
        className="provider-button google-button"
      >
        <img
          src="images/google_g_logo.svg"
          alt="Google logo"
          className="provider-icon border"
        />
        <span className="ms-3">Sign in with Google</span>
      </Button>
    </>
  )
}

export default TraditionalProviders
