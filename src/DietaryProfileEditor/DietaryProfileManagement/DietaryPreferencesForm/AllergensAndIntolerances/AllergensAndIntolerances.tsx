import './AllergensAndIntolerances.css'
import Form from 'react-bootstrap/Form'
import { FormattedMessage } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'

const AllergensAndIntolerances: React.FC = () => {
  return (
    <>
      <Form.Group controlId="selectAllergens">
        <Form.Label>
          <h4>
            <FormattedMessage
              id="whatAreYouAllergicTo"
              defaultMessage="What are you allergic to?"
            />
          </h4>
        </Form.Label>

        <Row className="allergen-checkbox-row">
          <Col xs={6} lg={3}>
            <Stack gap={1}>
              <div className="form-check">
                <input
                  className="form-check-input app-form-control application-form-checkbox"
                  type="checkbox"
                  value=""
                  id="glutenCheckbox"
                />

                <img
                  src="images/allergens/gluten.svg"
                  className="allergen-icon ms-1 me-1"
                />

                <label className="form-check-label" htmlFor="glutenCheckbox">
                  <FormattedMessage id="gluten" defaultMessage="Gluten" />
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input app-form-control application-form-checkbox"
                  type="checkbox"
                  value=""
                  id="crustaceansCheckbox"
                />

                <img
                  src="images/allergens/crustaceans.svg"
                  className="allergen-icon ms-1 me-1"
                />

                <label
                  className="form-check-label"
                  htmlFor="crustaceansCheckbox"
                >
                  <FormattedMessage
                    id="crustaceans"
                    defaultMessage="Crustaceans"
                  />
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input app-form-control application-form-checkbox"
                  type="checkbox"
                  value=""
                  id="eggsCheckbox"
                />

                <img
                  src="images/allergens/eggs.svg"
                  className="allergen-icon ms-1 me-1"
                />

                <label className="form-check-label" htmlFor="eggsCheckbox">
                  <FormattedMessage id="eggs" defaultMessage="Eggs" />
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input app-form-control application-form-checkbox"
                  type="checkbox"
                  value=""
                  id="fishCheckbox"
                />

                <img
                  src="images/allergens/fish.svg"
                  className="allergen-icon ms-1 me-1"
                />

                <label className="form-check-label" htmlFor="fishCheckbox">
                  <FormattedMessage id="fish" defaultMessage="Fish" />
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input app-form-control application-form-checkbox"
                  type="checkbox"
                  value=""
                  id="peanutsCheckbox"
                />

                <img
                  src="images/allergens/peanuts.svg"
                  className="allergen-icon ms-1 me-1"
                />

                <label className="form-check-label" htmlFor="peanutsCheckbox">
                  <FormattedMessage id="peanuts" defaultMessage="Peanuts" />
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input app-form-control application-form-checkbox"
                  type="checkbox"
                  value=""
                  id="soyaCheckbox"
                />

                <img
                  src="images/allergens/soya.svg"
                  className="allergen-icon ms-1 me-1"
                />

                <label className="form-check-label" htmlFor="soyaCheckbox">
                  <FormattedMessage id="soya" defaultMessage="Soya" />
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input app-form-control application-form-checkbox"
                  type="checkbox"
                  value=""
                  id="milkCheckbox"
                />

                <img
                  src="images/allergens/milk.svg"
                  className="allergen-icon ms-1 me-1"
                />

                <label className="form-check-label" htmlFor="milkCheckbox">
                  <FormattedMessage id="milk" defaultMessage="Milk" />
                </label>
              </div>
            </Stack>
          </Col>

          <Col xs={6} lg={3}>
            <Stack gap={1}>
              <div className="form-check">
                <input
                  className="form-check-input app-form-control application-form-checkbox"
                  type="checkbox"
                  value=""
                  id="nutsCheckbox"
                />

                <img
                  src="images/allergens/nuts.svg"
                  className="allergen-icon ms-1 me-1"
                />

                <label className="form-check-label" htmlFor="nutsCheckbox">
                  <FormattedMessage id="nuts" defaultMessage="Nuts" />
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input app-form-control application-form-checkbox"
                  type="checkbox"
                  value=""
                  id="celeryCheckbox"
                />

                <img
                  src="images/allergens/celery.svg"
                  className="allergen-icon ms-1 me-1"
                />

                <label className="form-check-label" htmlFor="celeryCheckbox">
                  <FormattedMessage id="celery" defaultMessage="Celery" />
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input app-form-control application-form-checkbox"
                  type="checkbox"
                  value=""
                  id="mustardCheckbox"
                />

                <img
                  src="images/allergens/mustard.svg"
                  className="allergen-icon ms-1 me-1"
                />

                <label className="form-check-label" htmlFor="mustardCheckbox">
                  <FormattedMessage id="mustard" defaultMessage="Mustard" />
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input app-form-control application-form-checkbox"
                  type="checkbox"
                  value=""
                  id="sesameCheckbox"
                />

                <img
                  src="images/allergens/sesame.svg"
                  className="allergen-icon ms-1 me-1"
                />

                <label className="form-check-label" htmlFor="sesameCheckbox">
                  <FormattedMessage id="sesame" defaultMessage="Sesame" />
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input app-form-control application-form-checkbox"
                  type="checkbox"
                  value=""
                  id="sulphitesCheckbox"
                />

                <img
                  src="images/allergens/sulphites.svg"
                  className="allergen-icon ms-1 me-1"
                />

                <label className="form-check-label" htmlFor="sulphitesCheckbox">
                  <FormattedMessage id="sulphites" defaultMessage="Sulphites" />
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input app-form-control application-form-checkbox"
                  type="checkbox"
                  value=""
                  id="lupinCheckbox"
                />

                <img
                  src="images/allergens/lupin.svg"
                  className="allergen-icon ms-1 me-1"
                />

                <label className="form-check-label" htmlFor="lupinCheckbox">
                  <FormattedMessage id="lupin" defaultMessage="Lupin" />
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input app-form-control application-form-checkbox"
                  type="checkbox"
                  value=""
                  id="molluscsCheckbox"
                />

                <img
                  src="images/allergens/molluscs.svg"
                  className="allergen-icon ms-1 me-1"
                />

                <label className="form-check-label" htmlFor="molluscsCheckbox">
                  <FormattedMessage id="molluscs" defaultMessage="Molluscs" />
                </label>
              </div>
            </Stack>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group controlId="selectIntolerances" className="mt-3">
        <Form.Label>
          <h4>
            <FormattedMessage
              id="whatAreYourIntolerances"
              defaultMessage="What are your food intolerances?"
            />
          </h4>
        </Form.Label>

        <Form.Check type="checkbox" id="id1">
          <Form.Check.Input
            type="checkbox"
            className="app-form-control application-form-checkbox"
          />
          <Form.Check.Label>Check me out!</Form.Check.Label>
        </Form.Check>
      </Form.Group>
    </>
  )
}

export default AllergensAndIntolerances
