import React, { useState } from 'react'
import { useSession } from '@inrupt/solid-ui-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import './ProfileOverview.css'
import { FormattedMessage } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'

type ProfileOverviewProps = {
  userId: string
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Displays the logged in user's dietary profile.
 * @param setEditProfile Changes a state variable to indicate whether the user wants to edit their dietary profile.
 */
const ProfileOverview: React.FC<ProfileOverviewProps> = ({
  userId,
  setEditProfile,
}) => {
  const { session: solidSession } = useSession()

  const [firebaseUser] = useAuthState(auth)

  const signedInWithSolid = solidSession.info.isLoggedIn

  const signedInWithFirebase = firebaseUser !== null

  const routerNavigate = useNavigate()

  const [showOffcanvas, setShowOffCanvas] = useState(false)

  /**
   * Signs the user out of the application.
   */
  async function applicationSignOut() {
    if (signedInWithSolid) {
      await solidSession.logout({ logoutType: 'app' }).catch((error: Error) => {
        console.log(error.message)
      })
    }

    if (signedInWithFirebase) {
      await signOut(auth).catch((error: Error) => {
        console.log(error.message)
      })
    }

    routerNavigate('/login')
  }

  return (
    <div className="position-relative">
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffCanvas(false)}
        placement="end"
        className="profile-overview-offcanvas"
      >
        <div className="position-relative">
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

          <div className="user-information">
            <div className="user-name">John Doe</div>
            <div className="user-identifier">{userId}</div>
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
            className="offcanvas-item-button-icon position-absolute"
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
            className="offcanvas-item-button-icon position-absolute"
          />

          <span className="ms-5">
            <FormattedMessage id="editProfile" defaultMessage="Edit profile" />
          </span>
        </button>

        <button
          onClick={() => {
            void applicationSignOut()
          }}
          className="invisible-button offcanvas-item-button text-start position-relative"
        >
          <img
            src="images/box-arrow-right.svg"
            alt="Sign out icon"
            className="offcanvas-signout-icon position-absolute"
          />

          <span className="ms-5 text-danger">
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
                id="allergenPreferencesHeading"
                defaultMessage="Allergens"
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
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>
              <FormattedMessage
                id="dietPreferencesHeading"
                defaultMessage="Diet Preferences"
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
                id="tastePreferencesHeading"
                defaultMessage="Taste Preferences"
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
