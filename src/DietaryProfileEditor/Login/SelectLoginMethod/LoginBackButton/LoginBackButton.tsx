import { FormattedMessage } from 'react-intl'
import './LoginBackButton.css'

type LoginBackButtonProps = {
  setParentComponentScreenState: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * An arrow button for navigating back on the login screen.
 * @param setParentComponentScreenState A set state component function for login navigation.
 */
const LoginBackButton: React.FC<LoginBackButtonProps> = ({
  setParentComponentScreenState,
}) => {
  /**
   * Calls the setParentComponentScreenState to navigate the user a step back in the login screen.
   */
  function setParentComponentGoBack() {
    setParentComponentScreenState(false)
  }

  return (
    <button
      aria-label="back-button"
      className="login-back-button"
      onClick={() => setParentComponentGoBack()}
    >
      <img
        src="images/arrow-left-short.svg"
        alt="Back button arrow"
        className="back-button-arrow"
      />

      <FormattedMessage id="goBack" defaultMessage="Back" />
    </button>
  )
}

export default LoginBackButton
