import { SessionProvider } from '@inrupt/solid-ui-react'
import IntlProviderWrapper from './components/IntlProviderWrapper'
import RouterWrapper from './components/RouterWrapper'

const App: React.FC = () => {
  return (
    <SessionProvider>
      <IntlProviderWrapper>
        <RouterWrapper />
      </IntlProviderWrapper>
    </SessionProvider>
  )
}

export default App
