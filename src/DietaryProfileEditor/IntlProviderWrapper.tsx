import { IntlProvider } from 'react-intl'
import { useState } from 'react'
import LanguageContext from './LanguageContext'
import { PropsWithChildren } from 'react'

type Messages = {
  manageYourProfileLoginScreenHeading: string
  selectSignInMethod: string
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
  allergicTo: string
  diets: string
  onDiets: string
  tastePreferencesHeading: string
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
  yes: string
  no: string
  howSpicyShouldItBe: string
  mild: string
  medium: string
  hot: string
  extraHot: string
  selectASolidProvider: string
  typeInProviderUrlHeading: string
  providerUrlPlaceholder: string
  chooseSolidProvider: string
  goBack: string
  loginSolidErrorMessage: string
  emptyUrlAlert: string
  solidDescription: string
  closeModal: string
  firebaseLoginErrorMessageFacebook: string
  firebaseLoginErrorMessageGoogle: string
  loginFailed: string
  aboutApplicationTitle: string
  aboutApplicationBody: string
  emailAndPassword: string
  loginWithEmail: string
  password: string
  signIn: string
  newAccount: string
  createAccount: string
  createYourAccount: string
  signUp: string
  provideValidEmail: string
  passwordMustContain: string
  atLeastEightChars: string
  lowerCaseLetter: string
  upperCaseLetter: string
  number: string
  close: string
  signUpFailed: string
  singUpDefaultErrorMessage: string
  signUpEmailInUse: string
  emailOrPasswordInvalid: string
  loginCredentialsNotValid: string
  emailLoginErrorMessage: string
  profileOverviewHeading: string
  gluten: string
  crustaceans: string
  eggs: string
  fish: string
  peanuts: string
  soya: string
  milk: string
  nuts: string
  celery: string
  mustard: string
  sesame: string
  sulphites: string
  lupin: string
  molluscs: string
  dietPreferencesHeading: string
  whichDietsDoYouFollow: string
  calorieTrackingGoal: string
  tastesAndFoodPreparation: string
  favoriteWorldCuisines: string
  foodIngredientsLikeOrDislike: string
  doYouLikeSpicyFood: string
  notSpecified: string
  notAtAll: string
  yesIDo: string
  howSpicyShouldFoodBe: string
  whichCookingMethodsDoYouPrefer: string
  dailyCalorieIntakeGoal: string
  yourFavoriteCuisines: string
  likedIngredients: string
  dislikedIngredients: string
  howSpicyYouLikeYourFood: string
  preferredCookingMethods: string
  finish: string
  allergenPreferencesHeading: string
  deleteProfile: string
  searchMoreDiets: string
  next: string
  vegetarianDiet: string
  mediterraneanDiet: string
  lowCarbDiet: string
  veganDiet: string
  ketoDiet: string
  atkinsDiet: string
  paleoDiet: string
  error: string
  fetchingDietsFailed: string
  italianCuisine: string
  greekCuisine: string
  mexicanCuisine: string
  chineseCuisine: string
  turkishCuisine: string
  spanishCuisine: string
  japaneseCuisine: string
  frenchCuisine: string
  searchMoreCuisines: string
  fetchingCuisinesFailed: string
  fetchingIngredientsFailed: string
  whatILike: string
  searchIngredients: string
  whatIDontLike: string
  bakingMethod: string
  grillingMethod: string
  boilingMethod: string
  deepFryingMethod: string
  steamingMethod: string
  sauteingMethod: string
  fetchingCookingMethodsFailed: string
  searchMoreCookingMethods: string
  emptyProfileText: string
  preferredCookingMethodsOverview: string
  profileSavedSuccessfully: string
  profileDeletion: string
  profileDeletionConfirm: string
  delete: string
  profileDeletionSuccessMessage: string
  profileDeletionNotFoundMessage: string
  profileDeletionErrorMessage: string
  saveProfileModalTitle: string
  profileSaveError: string
  profileLoading: string
  loadingProfileError: string
}

const messagesInSlovak: Messages = {
  manageYourProfileLoginScreenHeading: 'Spravujte svoje jedálne preferencie',
  selectSignInMethod: 'Vyberte spôsob prihlásenia',
  signInWithSolid: 'Solid',
  whatIsSolid: 'Čo je to Solid?',
  signInDivider: 'alebo',
  signInWithFacebook: 'Facebook',
  signInWithGoogle: 'Google',
  redirectToProvider: 'Prejsť na poskytovateľa',
  welcomeToTheApplication: 'Vitajte v editore vášho diétneho profilu!',
  aboutTheApplication: 'O aplikácii',
  sourceCode: 'Zdrojový kód',
  createdBy: 'Vytvoril',
  editProfile: 'Upraviť profil',
  importProfile: 'Importovať profil',
  downloadProfile: 'Stiahnuť profil',
  userManual: 'Používateľská príručka',
  signOut: 'Odhlásiť sa',
  allergicTo: 'Ste alergickí na: ',
  diets: 'Diéty',
  onDiets: 'Vaše diéty sú: ',
  tastePreferencesHeading: 'Preferencie chutí',
  worldCuisines: 'Obľúbené svetové kuchyne',
  tasteOfDesserts: 'Preferovaná chuť zákuskov',
  tasteSpiciness: 'Úroveň štipľavosti',
  whatAreYouAllergicTo: 'Na čo máte alergiu?',
  nextStep: 'Ďalší krok: ',
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
  yes: 'Áno',
  no: 'Nie',
  howSpicyShouldItBe: 'Ako veľmi pálivé by malo byť?',
  mild: 'Jemne',
  medium: 'Stredne',
  hot: 'Veľmi',
  selectASolidProvider: 'Vyberte poskytovateľa Solid',
  typeInProviderUrlHeading: 'Alebo vložte poskytovateľovu URL',
  providerUrlPlaceholder: 'Zadajte URL poskytovateľa',
  chooseSolidProvider: 'Zvoľte Solid poskytovateľa',
  goBack: 'Späť',
  loginSolidErrorMessage: `Možné dôvody sú:
      1. Nie ste pripojení na internet.
      2. Zadaná URL poskytovateľa je nesprávna.
      3. Problém je na strane zvoleného Solid poskytovateľa.
    `,
  emptyUrlAlert: 'Vyberte poskytovateľa alebo zadajte poskytovateľovu URL.',
  solidDescription: `
    <b>Solid</b> vám umožňuje mať kontrolu nad tým kde sú vaše dáta uložené a kto k nim má prístup. Na začiatok si budete musieť u poskytovateľa Solid zaobstarať vaše WebID. Taktiež sa môžete prihlásiť pod vaším Google alebo Facebook účtom, pričom vaše dáta budú uložené na serveroch týchto poskytovateľov. Solid môžete začať používať aj neskôr a vaše dáta si v rámci aplikácie preniesť. Viac sa dozviete na <a>oficiálnej stránke</a> projektu Solid.
  `,
  closeModal: 'Zavrieť',
  firebaseLoginErrorMessageFacebook:
    'Prihlásenie zlyhalo z dôvodu chyby v prihlasovacej službe.',
  firebaseLoginErrorMessageGoogle:
    'Prihlásenie zlyhalo pretože buď nemáte prístup na internet alebo z dôvodu chyby v prihlasovacej službe.',
  loginFailed: 'Prihlásenie bolo neúspešné',
  aboutApplicationTitle: 'O aplikácii',
  aboutApplicationBody:
    '<b>Editor diétneho profilu</b> slúži pre ľudí ktorí radi jedia v reštauráciách a sú obmedzovaní alergiami alebo majú iné jedálne preferencie. Aplikácia vám umožňuje uložiť a spravovať váš diétny profil. Výnimočná je v tom, že umožňuje použiť technológiu <b>Solid</b>, a tým pádom budú vaše dáta uložené decentralizovaným spôsobom a budete mať kontrolu nad tým kto ich môže vidieť, čo zaručí vyššiu mieru súkromia.',
  emailAndPassword: 'Email a heslo',
  loginWithEmail: 'Prihláste sa pomocou emailu',
  password: 'Heslo',
  signIn: 'Prihlásiť sa',
  newAccount: 'Ak ste noví, je taktiež možné',
  createAccount: 'Vytvoriť účet',
  createYourAccount: 'Založte si účet',
  signUp: 'Zaregistrovať sa',
  provideValidEmail: 'Zadajte platnú emailovú adresu',
  passwordMustContain: 'Heslo musí obsahovať',
  atLeastEightChars: 'Aspoň 8 znakov',
  lowerCaseLetter: 'Malé písmeno',
  upperCaseLetter: 'Veľké písmeno',
  number: 'Číslo',
  close: 'Zatvoriť',
  signUpFailed: 'Chyba pri vytváraní účtu',
  singUpDefaultErrorMessage:
    'Účet sa nepodarilo vytvoriť. Skontrolujte prosím vaše internetové pripojenie a skúste to znovu.',
  signUpEmailInUse:
    'Pre zadanú emailovú adresu už existuje účet. Zvoľte prosím inú adresu alebo sa prihláste.',
  emailOrPasswordInvalid:
    'Zadaný email alebo heslo sú nesprávne. Skontrolujte si prosím údaje a skúste to znovu.',
  loginCredentialsNotValid:
    'Buďto je zadaný email v nesprávnom formáte alebo ste nezadali heslo. Skontrolujte prosím vaše prihlasovacie údaje a skúste to znovu.',
  emailLoginErrorMessage:
    'Prihlásenie bolo neúspešné kvôli nesprávnym prihlasovacím údajom.',
  profileOverviewHeading: 'Vaše jedálne preferencie',
  gluten: 'Lepok',
  crustaceans: 'Kôrovce',
  eggs: 'Vajcia',
  fish: 'Ryby',
  peanuts: 'Arašidy',
  soya: 'Sója',
  milk: 'Mlieko',
  nuts: 'Orechy',
  celery: 'Zeler',
  mustard: 'Horčica',
  sesame: 'Sezam',
  sulphites: 'Siričitany',
  lupin: 'Vlčí bôb',
  molluscs: 'Mäkkýše',
  dietPreferencesHeading: 'Diéty',
  whichDietsDoYouFollow: 'Ktoré diéty dodržiavate?',
  calorieTrackingGoal:
    'V prípade že si počítate kalórie, aký je váš denný príjem?',
  tastesAndFoodPreparation: 'Preferencie chutí',
  favoriteWorldCuisines: 'Aké sú vaše obľúbené svetové kuchyne?',
  foodIngredientsLikeOrDislike:
    'Ktoré ingrediencie máte radi a ktoré naopak nie?',
  doYouLikeSpicyFood: 'Máte radi pálivé jedlá?',
  notSpecified: 'Nešpecifikované',
  notAtAll: 'Vôbec',
  yesIDo: 'Áno, mám',
  howSpicyShouldFoodBe: 'Zvoľte úroveň ostrosti',
  whichCookingMethodsDoYouPrefer:
    'Ktoré spôsoby prípravy jedla uprednostňujete?',
  dailyCalorieIntakeGoal: 'Váš denný príjem kalórií je: ',
  yourFavoriteCuisines: 'Vaše obľúbené svetové kuchyne sú: ',
  likedIngredients: 'Obľúbené ingrediencie: ',
  dislikedIngredients: 'Neobľúbené ingrediencie: ',
  howSpicyYouLikeYourFood: 'Preferovaná úroveň pálivosti jedla: ',
  preferredCookingMethods: 'Uprednostňované spôsoby prípravy jedla',
  finish: 'Uložiť',
  allergenPreferencesHeading: 'Alergény',
  deleteProfile: 'Zmazať profil',
  searchMoreDiets: 'Vyhľadajte ďalšie diéty',
  next: 'Ďalej',
  vegetarianDiet: 'Vegetariánstvo',
  mediterraneanDiet: 'Stredomorská strava',
  lowCarbDiet: 'Nízkosacharidová diéta',
  veganDiet: 'Veganstvo',
  ketoDiet: 'Ketogénna diéta',
  atkinsDiet: 'Atkinsonova diéta',
  paleoDiet: 'Paleo diéta',
  error: 'Chyba',
  fetchingDietsFailed: 'Načítanie diét bolo neúspešné',
  italianCuisine: 'Talianska',
  greekCuisine: 'Grécka',
  mexicanCuisine: 'Mexická',
  chineseCuisine: 'Čínska',
  turkishCuisine: 'Turecká',
  spanishCuisine: 'Španielska',
  japaneseCuisine: 'Japonská',
  frenchCuisine: 'Francúzska',
  searchMoreCuisines: 'Vyhľadajte ďalšie svetové kuchyne',
  fetchingCuisinesFailed: 'Načítanie svetových kuchýň bolo neúspešné',
  fetchingIngredientsFailed: 'Načítanie ingrediencií bolo neúspešné',
  whatILike: 'Mám rád',
  searchIngredients: 'Vyhľadajte ingrediencie',
  whatIDontLike: 'Nemám rád',
  extraHot: 'Extra',
  bakingMethod: 'Pečenie',
  grillingMethod: 'Grilovanie',
  boilingMethod: 'Varenie',
  deepFryingMethod: 'Vyprážanie',
  steamingMethod: 'Naparovanie',
  sauteingMethod: 'Restovanie',
  fetchingCookingMethodsFailed:
    'Načítanie spôsobov prípravy jedla bolo neúspešné',
  searchMoreCookingMethods: 'Vyhľadajte spôsoby prípravy',
  emptyProfileText: 'Profil je prázdny, kliknite na tlačidlo editácie profilu.',
  preferredCookingMethodsOverview: 'Preferované spôsoby prípravy jedla: ',
  profileSavedSuccessfully: 'Profil bol úspešne uložený',
  profileDeletion: 'Zmazanie profilu',
  profileDeletionConfirm: 'Naozaj chcete zmazať váš diétny profil?',
  delete: 'Zmazať',
  profileDeletionSuccessMessage: 'Profil bol úspešne zmazaný',
  profileDeletionNotFoundMessage: 'Profil nebol nájdený',
  profileDeletionErrorMessage: 'Profil sa nepodarilo zmazať',
  saveProfileModalTitle: 'Uloženie profilu',
  profileSaveError: 'Profil sa nepodarilo uložiť',
  profileLoading: 'Načítanie profilu',
  loadingProfileError: 'Načítanie profilu sa skončilo chybou',
}

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
