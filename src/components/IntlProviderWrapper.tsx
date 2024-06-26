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
  whichDietsAreYouOn: string
  showLessDietOptions: string
  showMoreDietOptions: string
  isYourDietNotListed: string
  searchForMoreDiets: string
  specifyYourTastePreferences: string
  whichWorldCuisinesDoYouLike: string
  loadingData: string
  searchForMoreWorldCuisines: string
  whichTasteOfDessertsDoYouPrefer: string
  doesNotMatter: string
  sweet: string
  savory: string
  doYouLikeSpicyFood: string
  yes: string
  no: string
  howSpicyShouldItBe: string
  mild: string
  medium: string
  hot: string
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
  welcomeToTheApplication: 'Vitajte v editore vášho diétneho profilu!',
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
  whichDietsAreYouOn: 'Ktoré diéty dodržiavate?',
  showLessDietOptions: 'Zobraziť menej možností',
  showMoreDietOptions: 'Zobraziť viac možností',
  isYourDietNotListed: 'Chýba vaša diéta v zozname?',
  searchForMoreDiets: 'Hľadať ďalšie diéty...',
  specifyYourTastePreferences: 'Špecifikujte vaše chuťové preferencie',
  whichWorldCuisinesDoYouLike: 'Ktoré svetové kuchyne máte radi?',
  loadingData: 'Načítavam dáta',
  searchForMoreWorldCuisines: 'Hľadať ďalšie svetové kuchyne...',
  whichTasteOfDessertsDoYouPrefer: 'Aké zákusky máte radšej?',
  doesNotMatter: 'Nezáleží',
  sweet: 'Sladké',
  savory: 'Slané',
  doYouLikeSpicyFood: 'Obľubujete pálivé jedlo?',
  yes: 'Áno',
  no: 'Nie',
  howSpicyShouldItBe: 'Ako veľmi pálivé by malo byť?',
  mild: 'Jemne',
  medium: 'Stredne',
  hot: 'Veľmi',
}

// const cs_messages: Messages = {

// }

const IntlProviderWrapper: React.FC<PropsWithChildren> = (props) => {
  const [selectedLanguageLocale, setSelectedLanguageLocale] = useState('en')

  const languageContextInitialValue = {
    selectedLanguage: selectedLanguageLocale,
    setSelectedLanguage: setSelectedLanguageLocale,
  }

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
        messages={getCurrentLocaleMessages(selectedLanguageLocale)}
        locale={selectedLanguageLocale}
      >
        {props.children}
      </IntlProvider>
    </LanguageContext.Provider>
  )
}

export default IntlProviderWrapper
