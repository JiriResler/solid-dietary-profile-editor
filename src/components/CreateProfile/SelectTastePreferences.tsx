import { TastePreferences } from './profileDataTypes'
import Select, { MultiValue } from 'react-select'
import selectMenuOptionFilter from './selectMenuOptionFilter'
import SelectMenuOption from './selectMenuOptionType'

const worldCuisines = [
  { label: 'French', value: 'IRIa' },
  { label: 'Italian', value: 'IRIb' },
  { label: 'Japanese', value: 'IRIc' },
  { label: 'Slovak', value: 'IRId' },
  { label: 'Czech', value: 'IRIe' },
  { label: 'Chinese', value: 'IRIf' },
  { label: 'Indian', value: 'IRIg' },
  { label: 'Mexican', value: 'IRIh' },
]

type Props = {
  currentStep: number
  selectedTastePreferences: TastePreferences
  setSelectedTastePreferences: React.Dispatch<
    React.SetStateAction<TastePreferences>
  >
}

const SelectComponents = {
  IndicatorSeparator: () => null,
  ClearIndicator: () => null,
}

const SelectTastePreferences: React.FC<Props> = ({
  currentStep,
  selectedTastePreferences,
  setSelectedTastePreferences,
}) => {
  function handleSelectOnChange(cuisinesArray: MultiValue<SelectMenuOption>) {
    const newTastePreferences = {
      ...selectedTastePreferences,
      cuisines: cuisinesArray,
    }

    setSelectedTastePreferences(newTastePreferences)
  }

  return (
    <>
      <h1>{currentStep}. Specify your taste preferences</h1>
      <h3>World cuisines</h3>
      <Select
        options={worldCuisines}
        value={selectedTastePreferences.cuisines}
        filterOption={selectMenuOptionFilter}
        isMulti
        onChange={(newArray) => {
          handleSelectOnChange(newArray)
        }}
        components={SelectComponents}
        placeholder="Select cuisines..."
      />
      <h3>desserts - sweet or non sweet</h3>
      <h3>spicyness - 3 levels</h3>
    </>
  )
}

export default SelectTastePreferences
