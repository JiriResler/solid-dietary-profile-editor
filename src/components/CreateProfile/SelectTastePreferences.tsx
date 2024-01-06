type Props = {
  selectedDiets: ReadonlyArray<SelectMenuOption>
  setSelectedDiets: React.Dispatch<
    React.SetStateAction<ReadonlyArray<SelectMenuOption>>
  >
}

const SelectTastePreferences: React.FC<Props> = ({
  selectedDiets,
  setSelectedDiets,
}) => {
  return <><h1>taste prefereces</h1></>
}

export default SelectTastePreferences
