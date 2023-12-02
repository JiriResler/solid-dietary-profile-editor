import './TraditionalProviders.css'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import { auth, facebook } from '../firebase'
import { signInWithPopup } from 'firebase/auth'

const TraditionalProviders: React.FC = () => {
  return (
    <Stack direction="horizontal" gap={3} className=" mx-auto">
      <Button
        onClick={() => {
          void signInWithPopup(auth, facebook)
        }}
        className="provider-button facebook-button"
      >
        <img
          src="images/facebook_round_white_icon.svg"
          alt="Facebook logo"
          className="provider-icon"
        />
      </Button>
      <Button className="provider-button google-button">
        <img
          src="images/google_g_logo.svg"
          alt="Google logo"
          className="provider-icon"
        />
      </Button>
      <Button className="provider-button apple-button">
        <img
          src="images/apple_logo_white.svg"
          alt="Apple logo"
          className="provider-icon"
        />
      </Button>
    </Stack>
  )
}

export default TraditionalProviders
