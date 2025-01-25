import React from 'react'
import './ProfileOverview.css'
import { FormattedMessage } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

const ProfileOverview: React.FC = () => {
  type CustomToggleProps = {
    children?: React.ReactNode
    onClick?: (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => NonNullable<unknown>
  }

  const CustomToggle = React.forwardRef(
    (props: CustomToggleProps, ref: React.Ref<HTMLDivElement>) => (
      <div
        ref={ref}
        onClick={(e) => {
          e.preventDefault()
          if (props.onClick) props.onClick(e)
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="white"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      </div>
    ),
  )

  return (
    <div className="profile-overview-screen position-relative">
      <Row className="profile-overview-head-section align-items-center">
        <Col className="ms-2">
          <FormattedMessage
            id="profileOverviewHeading"
            defaultMessage="Dietary profile"
          />
        </Col>

        <Col className="position-relative h-100">
          <Dropdown className="position-absolute top-50 end-0 translate-middle-y me-4">
            <Dropdown.Toggle as={CustomToggle} />
          </Dropdown>
        </Col>
      </Row>

      <Stack gap={3} className="mt-3 preferences-card-stack">
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
              <ul>
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
              <FormattedMessage id="id" defaultMessage="Tastes" />
            </Card.Title>

            <Card.Subtitle className="mb-2 text-muted">
              <FormattedMessage id="onDiets" defaultMessage="Your diets are" />
            </Card.Subtitle>

            <Card.Text className="width-fit-content">
              <Stack direction="horizontal" gap={2}>
                <span className="w-100">Diet</span>
              </Stack>

              <Stack direction="horizontal" gap={2}>
                <span className="w-100">Diet</span>
              </Stack>
            </Card.Text>
          </Card.Body>
        </Card>
      </Stack>

      <Button className="edit-profile-button app-secondary-color-button position-absolute bottom-0 end-0 mb-3 me-3">
        <img
          src="images/pencil-square.svg"
          alt="Edit profile icon"
          className="edit-profile-icon"
        />
      </Button>
    </div>
  )
}

export default ProfileOverview
