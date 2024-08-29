import { SessionProvider } from '@inrupt/solid-ui-react'
import IntlProviderWrapper from './components/IntlProviderWrapper'
import DietaryProfileEditorRouter from './components/DietaryProfileEditorRouter'

const DietaryProfileEditor: React.FC = () => {
  return (
    <SessionProvider>
      <IntlProviderWrapper>
        <DietaryProfileEditorRouter />
      </IntlProviderWrapper>
    </SessionProvider>
  )
}

export default DietaryProfileEditor
