import './AllergensAndIntolerances.css'
import Form from 'react-bootstrap/Form'
import { FormattedMessage } from 'react-intl'

const AllergensAndIntolerances: React.FC = () => {
  return (
    <>
      <Form.Group controlId="selectAllergens">
        <Form.Label>
          <h3>
            <FormattedMessage
              id="whatAreYouAllergicTo"
              defaultMessage="What are you allergic to?"
            />
          </h3>
        </Form.Label>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="allergenCheckbox"
          />

          <img
            src="images/allergens/crustaceans.svg"
            className="allergen-icon me-1"
          />

          <label className="form-check-label" htmlFor="allergenCheckbox">
            Allergen
          </label>
        </div>
      </Form.Group>
    </>
  )
}

export default AllergensAndIntolerances
