import { useEffect, useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import './SelectAllergens.css'
import { Allergen } from './profileDataTypes'
import { fetch } from '@inrupt/solid-client-authn-browser'
import { getSolidDataset, getThing, getUrl } from '@inrupt/solid-client'

type Props = {
  currentStep: number
  selectedAllergens: Set<Allergen>
  setSelectedAllergens: React.Dispatch<React.SetStateAction<Set<Allergen>>>
}

const SelectAllergens: React.FC<Props> = ({
  currentStep,
  selectedAllergens,
  setSelectedAllergens,
}) => {
  const [allergenList, setAllergenList] = useState<Allergen[]>([])

  useEffect(() => {
    void fetchList()
  }, [])

  async function fetchList() {
    const dataset = await getSolidDataset(
      'https://personal-restaurant-menu-viewer-app.solidcommunity.net/public/List_of_allergens.ttl',
      {
        fetch: fetch as undefined,
      },
    )

    const thing = getThing(
      dataset,
      'https://personal-restaurant-menu-viewer-app.solidcommunity.net/public/List_of_allergens',
    )

    if (thing === null) {
      return
    }

    // get sequence from thing
    let counter = 1

    let itemExists = true

    const containsPropertyUrl = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#_'

    const allergenUrlArray = []

    while (itemExists) {
      const propertyUrl = containsPropertyUrl + counter

      const allergenUrl = getUrl(thing, propertyUrl)

      if (allergenUrl === null) {
        itemExists = false
        break
      }

      allergenUrlArray.push(allergenUrl)

      counter = counter + 1
    }

    console.log(allergenUrlArray)
  }

  function handleCheckboxOnChange(allergen: Allergen) {
    const newAllergenSet = new Set(selectedAllergens)

    if (newAllergenSet.has(allergen)) {
      newAllergenSet.delete(allergen)
    } else {
      newAllergenSet.add(allergen)
    }

    setSelectedAllergens(newAllergenSet)
  }

  return (
    <>
      <h1>{currentStep}. What are you allergic to?</h1>

      <p>
        A number in brackets is the number of the allergen given by the law.
      </p>

      <Row>
        {allergenList.map((allergen: Allergen) => {
          return (
            <Col key={allergen.IRI} xs={6}>
              <Stack direction="horizontal" gap={2}>
                <Form.Check
                  checked={selectedAllergens.has(allergen)}
                  onChange={() => {
                    handleCheckboxOnChange(allergen)
                  }}
                  type="checkbox"
                />
                <div>
                  {allergen.menuLegendNumber} {allergen.label}
                </div>
                <img
                  src={
                    'images/allergens/' + allergen.label.toLowerCase() + '.svg'
                  }
                  className="allergen-icon"
                />
              </Stack>
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default SelectAllergens
