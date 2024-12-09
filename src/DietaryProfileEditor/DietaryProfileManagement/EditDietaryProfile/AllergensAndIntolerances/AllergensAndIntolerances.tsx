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
                id="glutenCheckbox"
              />

              <img
                src="images/allergens/gluten.svg"
                className="allergen-icon me-1"
              />

              <label className="form-check-label" htmlFor="glutenCheckbox">
                <FormattedMessage id="gluten" defaultMessage="Gluten" />
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input app-form-control"
                type="checkbox"
                value=""
                id="crustaceansCheckbox"
              />

              <img
                src="images/allergens/crustaceans.svg"
                className="allergen-icon me-1"
              />

              <label className="form-check-label" htmlFor="crustaceansCheckbox">
                <FormattedMessage
                  id="crustaceans"
                  defaultMessage="Crustaceans"
                />
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input app-form-control"
                type="checkbox"
                value=""
                id="eggsCheckbox"
              />

              <img
                src="images/allergens/eggs.svg"
                className="allergen-icon me-1"
              />

              <label className="form-check-label" htmlFor="eggsCheckbox">
                <FormattedMessage id="eggs" defaultMessage="Eggs" />
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input app-form-control"
                type="checkbox"
                value=""
                id="fishCheckbox"
              />

              <img
                src="images/allergens/fish.svg"
                className="allergen-icon me-1"
              />

              <label className="form-check-label" htmlFor="fishCheckbox">
                <FormattedMessage id="fish" defaultMessage="Fish" />
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input app-form-control"
                type="checkbox"
                value=""
                id="peanutsCheckbox"
              />

              <img
                src="images/allergens/peanuts.svg"
                className="allergen-icon me-1"
              />

              <label className="form-check-label" htmlFor="peanutsCheckbox">
                <FormattedMessage id="peanuts" defaultMessage="Peanuts" />
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input app-form-control"
                type="checkbox"
                value=""
                id="soyaCheckbox"
              />

              <img
                src="images/allergens/soya.svg"
                className="allergen-icon me-1"
              />

              <label className="form-check-label" htmlFor="soyaCheckbox">
                <FormattedMessage id="soya" defaultMessage="Soya" />
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input app-form-control"
                type="checkbox"
                value=""
                id="milkCheckbox"
              />

              <img
                src="images/allergens/milk.svg"
                className="allergen-icon me-1"
              />

              <label className="form-check-label" htmlFor="milkCheckbox">
                <FormattedMessage id="milk" defaultMessage="Milk" />
              </label>
            </div>
          </Col>

          <Col xs={5} lg={3}>
            <div className="form-check">
              <input
                className="form-check-input app-form-control"
                type="checkbox"
                value=""
                id="eggsCheckbox"
              />

              <img
                src="images/allergens/eggs.svg"
                className="allergen-icon me-1"
              />

              <label className="form-check-label" htmlFor="eggsCheckbox">
                <FormattedMessage id="id" defaultMessage="Allergen" />
              </label>
            </div>
          </Col>
        </Row>
      </Form.Group>
    </>
  )
}

export default AllergensAndIntolerances
