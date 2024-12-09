import './AllergensAndIntolerances.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FormattedMessage } from 'react-intl'

const AllergensAndIntolerances: React.FC = () => {
  return (
    <>
      <h3>
        <FormattedMessage
          id="whatAreYouAllergicTo"
          defaultMessage="What are you allergic to?"
        />
      </h3>
    </>
  )
}

export default AllergensAndIntolerances
