import React, { Dispatch } from 'react'

interface ILanguageContext {
  language: string
  setLanguage: Dispatch<React.SetStateAction<string>>
}

const LanguageContext = React.createContext<ILanguageContext>({
  language: '',
  setLanguage: () => {},
})

export default LanguageContext
