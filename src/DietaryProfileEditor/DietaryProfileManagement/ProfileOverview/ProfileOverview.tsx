import React from 'react'
import { useState } from 'react'
import './ProfileOverview.css'
import { FormattedMessage } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'

type ProfileOverviewProps = {
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Displays the logged in user's dietary profile.
 * @param setEditProfile Changes a state variable to indicate whether the user wants to edit their dietary profile.
 */
const ProfileOverview: React.FC<ProfileOverviewProps> = ({
  setEditProfile,
}) => {
  const [showOffcanvas, setShowOffCanvas] = useState(false)

  return (
    <div className="position-relative">
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffCanvas(false)}
        placement="end"
        className="profile-overview-offcanvas"
      >
        <div className="position-relative">
          <img
            src="images/person-circle.svg"
            alt="Offcanvas user picture"
            className="offcanvas-profile-picture position-absolute top-0 start-50 translate-middle-x"
          />

          <button
            className="invisible-button position-absolute top-0 end-0"
            aria-label="Close offcanvas"
            onClick={() => setShowOffCanvas(false)}
          >
            <img
              src="images/close-x.svg"
              alt="Close offcanvas icon"
              className="offcanvas-close-icon"
            />
          </button>

          <div className="user-information text-center">
            <div>John Doe</div>
            <div className="user-identifier">john.doe@example.com</div>
          </div>
        </div>

        <hr className="mb-2" />

        <button
          className="invisible-button offcanvas-item-button text-start position-relative"
          onClick={() => setEditProfile(true)}
        >
          <img
            src="images/pencil-square-black.svg"
            alt="Edit profile icon"
            className="offcanvas-item-button-icon position-absolute ms-2"
          />

          <span className="ms-5">
            <FormattedMessage id="editProfile" defaultMessage="Edit profile" />
          </span>
        </button>

        <button
          className="invisible-button offcanvas-item-button text-start position-relative"
          onClick={() => setEditProfile(true)}
        >
          <img
            src="images/pencil-square-black.svg"
            alt="Edit profile icon"
            className="offcanvas-item-button-icon position-absolute ms-2"
          />

          <span className="ms-5">
            <FormattedMessage id="editProfile" defaultMessage="Edit profile" />
          </span>
        </button>

        <button className="invisible-button offcanvas-item-button text-start position-relative">
          <img
            src="images/box-arrow-right.svg"
            alt="Sign out icon"
            className="offcanvas-signout-icon position-absolute ms-2"
          />

          <span className="ms-5">
            <FormattedMessage id="signOut" defaultMessage="Sign out" />
          </span>
        </button>
      </Offcanvas>

      <Row className="sticky-top profile-overview-head-section align-items-center">
        <Col className="ms-2" xs={8}>
          <FormattedMessage
            id="profileOverviewHeading"
            defaultMessage="Dietary profile"
          />
        </Col>

        <Col className="text-end">
          <button
            onClick={() => setShowOffCanvas(true)}
            className="invisible-button"
            aria-label="Open offcanvas"
          >
            <img
              src="images/list.svg"
              alt="Hamburger icon"
              className="offcanvas-menu-icon"
            />
          </button>
        </Col>
      </Row>

      <Stack gap={3} className="preferences-card-stack mt-3 mb-3">
        <Card>
          <Card.Body>
            <Card.Title>
              <FormattedMessage
                id="allergiesAndFoodIntolerances"
                defaultMessage="Allergies and intolerances"
              />
            </Card.Title>

            <Card.Subtitle className="mt-2 mb-2 text-muted">
              <FormattedMessage
                id="allergicTo"
                defaultMessage="You are allergic to"
              />
            </Card.Subtitle>

            <Card.Text>
              <Stack gap={1} className="ms-1">
                <div>
                  <img
                    src="images/allergens/Crustaceans.svg"
                    alt="allergen icon"
                    className="allergen-icon"
                  />
                  <span className="ms-2">Crustaceans</span>
                </div>

                <div>
                  <img
                    src="images/allergens/Soya.svg"
                    alt="allergen icon"
                    className="allergen-icon"
                  />
                  <span className="ms-2">Soya</span>
                </div>
              </Stack>
            </Card.Text>

            <Card.Subtitle className="mb-2 text-muted">
              <FormattedMessage
                id="yourIntolerances"
                defaultMessage="Your have intolerance to"
              />
            </Card.Subtitle>

            <Card.Text>
              <ul className="no-bottom-margin">
                <li>Amines</li>
                <li>Corn</li>
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>
              <FormattedMessage
                id="dietPreferences"
                defaultMessage="Diet preferences"
              />
            </Card.Title>

            <Card.Subtitle className="mt-2 mb-2 text-muted">
              <FormattedMessage id="onDiets" defaultMessage="Your diets are" />
            </Card.Subtitle>

            <Card.Text>
              <ul>
                <li>Vegetarian</li>
                <li>Low-carb</li>
              </ul>
            </Card.Text>

            <Card.Subtitle className="mb-2 text-muted">
              <FormattedMessage
                id="dailyCalorieIntakeGoal"
                defaultMessage="Your daily calorie intake goal is"
              />
            </Card.Subtitle>

            <Card.Text className="ms-2">2000 kCal</Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>
              <FormattedMessage
                id="tastesAndFoodPreparation"
                defaultMessage="Tastes and food preparation"
              />
            </Card.Title>

            <Card.Subtitle className="mt-2 mb-2 text-muted">
              <FormattedMessage
                id="yourFavoriteCuisines"
                defaultMessage="Your favorite cuisines are"
              />
            </Card.Subtitle>

            <Card.Text>
              <ul>
                <li>Chinese</li>
                <li>Thai</li>
              </ul>
            </Card.Text>

            <Card.Subtitle className="mb-2 text-muted">
              <FormattedMessage
                id="likedIngredients"
                defaultMessage="You like ingredients"
              />
            </Card.Subtitle>

            <Card.Text>
              <ul>
                <li>Chicken breast</li>
                <li>Potato</li>
              </ul>
            </Card.Text>

            <Card.Subtitle className="mb-2 text-muted">
              <FormattedMessage
                id="dislikedIngredients"
                defaultMessage="You don't like ingredients"
              />
            </Card.Subtitle>

            <Card.Text>
              <ul>
                <li>Tomato</li>
                <li>Pork</li>
              </ul>
            </Card.Text>

            <Card.Subtitle className="mb-2 text-muted">
              <FormattedMessage
                id="howSpicyYouLikeYourFood"
                defaultMessage="How spicy you like your food"
              />
            </Card.Subtitle>

            <Card.Text className="ms-2">Not at all</Card.Text>

            <Card.Subtitle className="mb-2 text-muted">
              <FormattedMessage
                id="preferredCookingMethods"
                defaultMessage="Preferred cooking methods"
              />
            </Card.Subtitle>

            <Card.Text>
              <ul className="no-bottom-margin">
                <li>Steaming</li>
                <li>Pan frying</li>
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      </Stack>

      <Button
        className="position-absolute position-fixed bottom-0 end-0 mb-4 me-4 edit-profile-round-button app-secondary-color-button"
        onClick={() => setEditProfile(true)}
      >
        <img
          src="images/pencil-square.svg"
          alt="Edit profile icon"
          className="edit-profile-round-icon"
        />
      </Button>
    </div>
  )
}

export default ProfileOverview
