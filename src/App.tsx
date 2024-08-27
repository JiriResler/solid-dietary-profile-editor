import { SessionProvider } from '@inrupt/solid-ui-react'
import IntlProviderWrapper from './components/IntlProviderWrapper'
import DietaryProfileEditor from './components/DietaryProfileEditor'

const App: React.FC = () => {
  return (
    <SessionProvider>
      <IntlProviderWrapper>
        <DietaryProfileEditor />
      </IntlProviderWrapper>
    </SessionProvider>
  )
}

export default App
