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
