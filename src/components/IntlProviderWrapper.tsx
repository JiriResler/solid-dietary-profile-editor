import { IntlProvider } from 'react-intl'
import { useState } from 'react'
import LanguageContext from '../LanguageContext'
import { PropsWithChildren } from 'react'

type Messages = {
  manageYourProfileLoginScreenHeading: string
  selectIdentityProvider: string
  signInWithSolid: string
  whatIsSolid: string
  signInDivider: string
  signInWithFacebook: string
  signInWithGoogle: string
  redirectToProvider: string
  goBack: string
  welcomeToTheApplication: string
  aboutTheApplication: string
  sourceCode: string
  createdBy: string
  editProfile: string
  importProfile: string
  downloadProfile: string
  userManual: string
  signOut: string
  allergens: string
  allergicTo: string
  diets: string
  onDiets: string
  tastePreferences: string
  worldCuisines: string
  tasteOfDesserts: string
  tasteSpiciness: string
  whatAreYouAllergicTo: string
  nextStep: string
  saveProfile: string
}

const messagesInSlovak: Messages = {
  manageYourProfileLoginScreenHeading: 'Spravujte svoj diétny profil',
  selectIdentityProvider: 'Vyberte spôsob prihlásenia',
  signInWithSolid: 'Solid',
  whatIsSolid: 'Čo je to Solid?',
  signInDivider: 'alebo',
  signInWithFacebook: 'Prihlásiť sa cez Facebook',
  signInWithGoogle: 'Prihlásiť sa účtom Google',
  redirectToProvider: 'Prejsť na poskytovateľa',
  goBack: 'Späť',
  welcomeToTheApplication: 'Vitajte v personálnom editore diétneho profilu!',
  aboutTheApplication: 'O aplikácii',
  sourceCode: 'Zdrojový kód',
  createdBy: 'Vytvoril',
  editProfile: 'Editovať profil',
  importProfile: 'Importovať profil',
  downloadProfile: 'Stiahnuť profil',
  userManual: 'Používateľská príručka',
  signOut: 'Odhlásiť sa',
  allergens: 'Alergény',
  allergicTo: 'Ste alergický na',
  diets: 'Diéty',
  onDiets: 'Vaše diéty sú',
  tastePreferences: 'Chuťové preferencie',
  worldCuisines: 'Obľúbené svetové kuchyne',
  tasteOfDesserts: 'Preferovaná chuť zákuskov',
  tasteSpiciness: 'Úroveň štipľavosti',
  whatAreYouAllergicTo: 'Na čo máte alergiu?',
  nextStep: 'Ďalej',
  saveProfile: 'Uložiť profil',
}

// const cs_messages: Messages = {
  
// }

const IntlProviderWrapper: React.FC<PropsWithChildren> = (props) => {
  const [languageLocale, setLanguageLocale] = useState('en')
  const languageContextInitialValue = { language: languageLocale, setLanguage: setLanguageLocale }

  function getCurrentLocaleMessages(locale: string) {
    if (locale === 'sk') {
      return messagesInSlovak
    }

    // if (locale === 'cs') {
    //   return cs_messages
    // }

    return {}
  }

  return (
    <LanguageContext.Provider value={languageContextInitialValue}>
      <IntlProvider
        messages={getCurrentLocaleMessages(languageLocale)}
        locale={languageLocale}
      >
        {props.children}
      </IntlProvider>
    </LanguageContext.Provider>
  )
}

export default IntlProviderWrapper
