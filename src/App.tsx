import { SessionProvider } from '@inrupt/solid-ui-react'
import IntlProviderWrapper from './components/IntlProviderWrapper'
import RouterWrapper from './components/RouterWrapper'
import { Container as BootstrapContainer } from 'react-bootstrap'

const App: React.FC = () => {
  return (
    <SessionProvider>
      <IntlProviderWrapper>
        <BootstrapContainer fluid>
          <RouterWrapper />
        </BootstrapContainer>
      </IntlProviderWrapper>
    </SessionProvider>
  )
}

export default App
