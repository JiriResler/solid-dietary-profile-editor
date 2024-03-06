import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import { Diet } from './profileDataTypes'

const dietList: Diet[] = [
  {
    label: 'Vegetarian',
    iri: 'http://dbpedia.org/resource/Vegetarianism',
  },
  {
    label: 'Vegan',
    iri: 'http://dbpedia.org/resource/Veganism',
  },
  {
    label: 'Mediterranean',
    iri: 'http://dbpedia.org/resource/Mediterranean_diet',
  },
  {
    label: 'Ketogenic',
    iri: 'http://dbpedia.org/resource/Ketogenic_diet',
  },
  {
    label: 'Atkins',
    iri: 'http://dbpedia.org/resource/Atkins_diet',
  },
  {
    label: 'Paleolithic',
    iri: 'http://dbpedia.org/resource/Paleolithic_diet',
  },
  {
    label: 'Pescetarian',
    iri: 'http://dbpedia.org/resource/Pescetarianism',
  },
  {
    label: 'Raw foodism',
    iri: 'http://dbpedia.org/resource/Raw_foodism',
  },
  {
    label: 'Fruitarian',
    iri: 'http://dbpedia.org/resource/Fruitarianism',
  },
  {
    label: 'Diabetic',
    iri: 'http://dbpedia.org/resource/Diet_in_diabetes',
  },
  {
    label: 'DASH',
    iri: 'http://dbpedia.org/resource/DASH_diet',
  },
  {
    label: 'MIND',
    iri: 'http://dbpedia.org/resource/MIND_diet',
  },
]

type Props = {
  currentStep: number
  selectedDiets: Set<Diet>
  setSelectedDiets: React.Dispatch<React.SetStateAction<Set<Diet>>>
}

const SelectDiets: React.FC<Props> = ({
  currentStep,
  selectedDiets,
  setSelectedDiets,
}) => {
  function handleCheckboxOnChange(diet: Diet) {
    const newDietSet = new Set(selectedDiets)

    if (newDietSet.has(diet)) {
      newDietSet.delete(diet)
    } else {
      newDietSet.add(diet)
    }

    setSelectedDiets(newDietSet)
  }
  return (
    <>
      <h1>{currentStep}. Which diets are you on?</h1>
      <Row>
        {dietList.map((diet: Diet) => {
          return (
            <Col key={diet.iri} xs={6}>
              <Row>
                <Stack direction="horizontal" gap={2}>
                  <Col xs={10}>
                    <Stack direction="horizontal" gap={2}>
                      <Form.Check
                        checked={selectedDiets.has(diet)}
                        onChange={() => {
                          handleCheckboxOnChange(diet)
                        }}
                        type="checkbox"
                      />
                      <div>{diet.label}</div>
                    </Stack>
                  </Col>
                  <Col>
                    <img
                      src="images/info_icon.svg"
                      alt="information icon"
                      onClick={() => {
                        alert('click')
                      }}
                    />
                  </Col>
                </Stack>
              </Row>
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default SelectDiets
