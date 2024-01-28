import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

const About: React.FC = () => {
  return (
    <div>
      <h1>This is the about page</h1>
      <div className="choose-provider-question">
        <FormattedMessage
          id="which_provider_to_choose"
          defaultMessage={'Which provider is the best option?'}
        />
      </div>
      <Link to="/">Go back</Link>
    </div>
  )
}

export default About
