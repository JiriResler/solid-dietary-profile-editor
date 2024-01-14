import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import SelectMenuOption from './selectMenuOptionType'

type Diet = {
  label: string
  IRI: string
}

const dietList: Diet[] = [
  {
    label: 'Vegetarian',
    IRI: 'http://dbpedia.org/resource/Vegetarianism',
  },
  {
    label: 'Vegan',
    IRI: 'http://dbpedia.org/resource/Veganism',
  },
  {
    label: 'Mediterranean',
    IRI: 'http://dbpedia.org/resource/Mediterranean_diet',
  },
  {
    label: 'Ketogenic',
    IRI: 'http://dbpedia.org/resource/Ketogenic_diet',
  },
  {
    label: 'Atkins',
    IRI: 'http://dbpedia.org/resource/Atkins_diet',
  },
  {
    label: 'Paleolithic',
    IRI: 'http://dbpedia.org/resource/Paleolithic_diet',
  },
  {
    label: 'Pescetarian',
    IRI: 'http://dbpedia.org/resource/Pescetarianism',
  },
  {
    label: 'Raw foodism',
    IRI: 'http://dbpedia.org/resource/Raw_foodism',
  },
  {
    label: 'Fruitarian',
    IRI: 'http://dbpedia.org/resource/Fruitarianism',
  },
  {
    label: 'Diabetic',
    IRI: 'http://dbpedia.org/resource/Diet_in_diabetes',
  },
  {
    label: 'DASH',
    IRI: 'http://dbpedia.org/resource/DASH_diet',
  },
  {
    label: 'MIND',
    IRI: 'http://dbpedia.org/resource/MIND_diet',
  },
]

type Props = {
  currentStep: number
  selectedDiets: ReadonlyArray<SelectMenuOption>
  setSelectedDiets: React.Dispatch<
    React.SetStateAction<ReadonlyArray<SelectMenuOption>>
  >
}

const SelectDiets: React.FC<Props> = ({
  currentStep,
  selectedDiets,
  setSelectedDiets,
}) => {
  const veganIRI = 'http://dbpedia.org/resource/Veganism'

  const [veganChecked, setVeganChecked] = useState(
    selectedDietsInclude(veganIRI),
  )

  const vegetarianIRI = 'http://dbpedia.org/resource/Vegetarianism'

  const [vegetarianChecked, setVegetarianChecked] = useState(
    selectedDietsInclude(vegetarianIRI),
  )

  function handleCheckboxOnChange(dietIRI: string, dietLabel: string) {
    const newDietsArray: SelectMenuOption[] = []

    if (selectedDietsInclude(dietIRI)) {
      for (const existingDiet of selectedDiets) {
        if (existingDiet.value === dietIRI) {
          continue
        }

        newDietsArray.push(existingDiet)
      }
    } else {
      for (const existingDiet of selectedDiets) {
        newDietsArray.push(existingDiet)
      }

      const newDiet: SelectMenuOption = { label: dietLabel, value: dietIRI }

      newDietsArray.push(newDiet)
    }

    setSelectedDiets(newDietsArray)

    if (dietLabel === 'Vegan') {
      setVeganChecked(!veganChecked)
    } else {
      setVegetarianChecked(!vegetarianChecked)
    }
  }

  return (
    <>
      <h1>{currentStep}. Which diets are you on?</h1>
      <Form.Check
        checked={veganChecked}
        onChange={() => {
          handleCheckboxOnChange(
            'http://dbpedia.org/resource/Veganism',
            'Vegan',
          )
        }}
        type="checkbox"
        label="Vegan"
      />
      <Form.Check
        checked={vegetarianChecked}
        onChange={() => {
          handleCheckboxOnChange(
            'http://dbpedia.org/resource/Vegetarianism',
            'Vegetarian',
          )
        }}
        type="checkbox"
        label="Vegetarian"
      />
    </>
  )
}

export default SelectDiets
