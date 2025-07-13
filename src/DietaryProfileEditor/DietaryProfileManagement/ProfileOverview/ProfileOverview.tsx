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
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Displays the logged in user's dietary profile.
 * @param setEditProfile Changes a state variable to indicate whether the user wants to edit their dietary profile.
 */
const ProfileOverview: React.FC<ProfileOverviewProps> = ({
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
          <div className="user-name mb-2">John Doe</div>
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
          onClick={() => alert('Delete pressed')}
        >
          <img
            src="images/trash.svg"
            alt="Delete profile icon"
            className="offcanvas-item-button-icon position-absolute"
          />

          <span className="ms-5">
            <FormattedMessage
              id="deleteProfile"
              defaultMessage="Delete profile"
            />
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
              <img
                src="images/exclamation-triangle.svg"
                alt="allergen-warning-icon"
                className="me-2 mb-1 preference-card-icon"
              />

              <FormattedMessage
                id="allergenPreferencesHeading"
                defaultMessage="Allergens"
              />
            </Card.Title>

            <Card.Subtitle className="mt-2 mb-2">
              <span className="text-muted">
                <FormattedMessage
                  id="allergicTo"
                  defaultMessage="You are allergic to: "
                />
              </span>

              <span>Celery, Gluten</span>
            </Card.Subtitle>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>
              <img
                src="images/leaf.svg"
                alt="diet-leaf-icon"
                className="me-2 mb-1 preference-card-icon"
              />

              <FormattedMessage
                id="dietPreferencesHeading"
                defaultMessage="Diets"
              />
            </Card.Title>

            <Card.Subtitle className="mt-2 mb-2">
              <Stack gap={2}>
                <div>
                  <span className="text-muted">
                    <FormattedMessage
                      id="onDiets"
                      defaultMessage="Your are on diets: "
                    />
                  </span>

                  <span>Vegetarian, Raw</span>
                </div>

                <div>
                  <span className="text-muted">
                    <FormattedMessage
                      id="dailyCalorieIntakeGoal"
                      defaultMessage="Daily calorie intake: "
                    />
                  </span>

                  <span>2000 kcal</span>
                </div>
              </Stack>
            </Card.Subtitle>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>
              <img
                src="images/fork-knife.svg"
                alt="fork-knife-icon"
                className="me-2 mb-1 preference-card-icon"
              />

              <FormattedMessage
                id="tastePreferencesHeading"
                defaultMessage="Taste Preferences"
              />
            </Card.Title>

            <Card.Subtitle className="mt-2 mb-2">
              <Stack gap={2}>
                <div>
                  <span className="text-muted">
                    <FormattedMessage
                      id="yourFavoriteCuisines"
                      defaultMessage="Favorite cuisines: "
                    />
                  </span>

                  <span>Italian, Japanese</span>
                </div>

                <div>
                  <span className="text-muted">
                    <FormattedMessage
                      id="howSpicyYouLikeYourFood"
                      defaultMessage="Preferred level of spiciness: "
                    />
                  </span>

                  <span>Mild</span>
                </div>

                <div>
                  <span className="text-muted">
                    <FormattedMessage
                      id="likedIngredients"
                      defaultMessage="Liked ingredients: "
                    />
                  </span>

                  <span>Avocado, Seaweed</span>
                </div>

                <div>
                  <span className="text-muted">
                    <FormattedMessage
                      id="dislikedIngredients"
                      defaultMessage="Disliked ingredients: "
                    />
                  </span>

                  <span>Mushrooms, Tofu</span>
                </div>
              </Stack>
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </Stack>

      <Button
        className="position-absolute position-fixed bottom-0 end-0 mb-4 me-4 edit-profile-round-button shadow"
        onClick={() => setEditProfile(true)}
      >
        <img
          src="images/pencil-square-blue.svg"
          alt="Edit profile icon"
          className="edit-profile-round-icon"
        />
      </Button>
    </div>
  )
}

export default ProfileOverview
