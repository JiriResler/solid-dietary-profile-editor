import React from 'react'
import './ProfileOverview.css'
import { FormattedMessage } from 'react-intl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'

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
          width="32"
          height="32"
          fill="white"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      </div>
    ),
  )

  return (
    <>
      <Row className="profile-overview-head-section position-relative align-items-center">
        <Col xs={10} md={11}>
          <span className="profile-overview-heading ms-2">
            <FormattedMessage
              id="profileOverviewHeading"
              defaultMessage="Your dietary profile"
            />
          </span>
        </Col>

        <Col className="text-center">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} />
          </Dropdown>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body className="profile-card-body">
              <Card.Title>
                <FormattedMessage id="allergens" defaultMessage="Allergens" />
              </Card.Title>

              <Card.Subtitle className="mb-2 text-muted">
                <FormattedMessage
                  id="allergicTo"
                  defaultMessage="You are allergic to"
                />
              </Card.Subtitle>

              <Card.Text className="width-fit-content">
                <Stack direction="horizontal" gap={2}>
                  <img
                    src="images/allergens/crustaceans.svg"
                    alt="allergen icon"
                  />
                  <span className="w-100">Allergen</span>
                </Stack>

                <Stack direction="horizontal" gap={2}>
                  <img
                    src="images/allergens/crustaceans.svg"
                    alt="allergen icon"
                  />
                  <span className="w-100">Allergen</span>
                </Stack>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body className="profile-card-body">
              <Card.Title>
                <FormattedMessage id="diets" defaultMessage="Diets" />
              </Card.Title>

              <Card.Subtitle className="mb-2 text-muted">
                <FormattedMessage
                  id="onDiets"
                  defaultMessage="Your diets are"
                />
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
        </Col>
      </Row>
    </>
  )
}

export default ProfileOverview
