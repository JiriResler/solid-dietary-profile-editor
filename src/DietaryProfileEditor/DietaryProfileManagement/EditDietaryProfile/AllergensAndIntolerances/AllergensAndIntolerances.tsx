import './AllergensAndIntolerances.css'
import Form from 'react-bootstrap/Form'
import { FormattedMessage } from 'react-intl'

const AllergensAndIntolerances: React.FC = () => {
  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>
          <h3>
            <FormattedMessage
              id="whatAreYouAllergicTo"
              defaultMessage="What are you allergic to?"
            />
          </h3>
        </Form.Label>

        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
    </>
  )
}

export default AllergensAndIntolerances
