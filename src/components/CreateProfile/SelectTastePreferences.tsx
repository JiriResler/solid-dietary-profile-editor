import { TastePreferences } from './profileDataTypes'

type Props = {
  currentStep: number
  selectedTastePreferences: TastePreferences
  setSelectedTastePreferences: React.Dispatch<
    React.SetStateAction<TastePreferences>
  >
}

const SelectTastePreferences: React.FC<Props> = ({
  currentStep,
  selectedTastePreferences,
  setSelectedTastePreferences,
}) => {
  return (
    <>
      <h1>{currentStep}. Taste preferences</h1>
      <h3>svetove kuchyne</h3>
      <h3>desserts - sweet or non sweet</h3>
      <h3>spicyness - 3 levels</h3>
    </>
  )
}

export default SelectTastePreferences
