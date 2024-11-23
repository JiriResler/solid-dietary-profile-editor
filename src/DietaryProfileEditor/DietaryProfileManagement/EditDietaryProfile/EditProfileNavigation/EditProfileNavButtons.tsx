import Button from 'react-bootstrap/Button'
import { FormattedMessage } from 'react-intl'
import './EditProfileNavButtons.css'

const EditProfileNavButtons: React.FC = () => {
  return (
    <>
      <Button className="navigation-button step-back-navigation-button app-secondary-color-button mb-2">
        {'<'}
      </Button>

      <Button className="navigation-button step-forward-navigation-button app-primary-color-button mb-2 ms-3">
        <FormattedMessage id="nextStep" defaultMessage="Next" />
      </Button>
    </>
  )
}

export default EditProfileNavButtons
