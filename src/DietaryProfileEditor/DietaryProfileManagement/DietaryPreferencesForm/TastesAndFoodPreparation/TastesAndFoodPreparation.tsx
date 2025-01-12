import './TastesAndFoodPreparation.css'
import { FormattedMessage } from 'react-intl'

/**
 *
 */
const TastesAndFoodPreparation: React.FC = () => {
  return (
    <>
      <div className="form-group-heading">
        <FormattedMessage
          id="favoriteWorldCuisines"
          defaultMessage="What are your favorite world cuisines?"
        />
      </div>
    </>
  )
}

export default TastesAndFoodPreparation
