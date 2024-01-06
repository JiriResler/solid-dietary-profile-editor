type Props = {
  currentStep: number
}

const SelectTastePreferences: React.FC<Props> = ({ currentStep }) => {
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
