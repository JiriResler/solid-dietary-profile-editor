import './AllergensAndIntolerances.css'
import Form from 'react-bootstrap/Form'
import { FormattedMessage } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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

        <Row>
          <Col xs={5} lg={3}>
            <div className="form-check">
              <input
                className="form-check-input app-form-control"
                type="checkbox"
                value=""
                id="allergenCheckbox"
              />

              <img
                src="images/allergens/crustaceans.svg"
                className="allergen-icon me-1"
              />

              <label className="form-check-label" htmlFor="allergenCheckbox">
                Allergen 1
              </label>
            </div>

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
                Allergen 2
              </label>
            </div>
          </Col>

          <Col xs={5} lg={3}>
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
                Allergen 3
              </label>
            </div>

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
                Allergen 4
              </label>
            </div>
          </Col>
        </Row>
      </Form.Group>
    </>
  )
}

export default AllergensAndIntolerances
