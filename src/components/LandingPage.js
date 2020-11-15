import react, {useState, useRef} from 'React';
import { useHistory } from 'react-router-dom';
import GoogleLogin from './LoginButton';

const LandingPage = () => {
  const history = useHistory();
  const navigateToExplorePage = () => {
    history.push('/explore')
  }
  return (
    <div>
      <GoogleLogin navigateAfterLogin={navigateToExplorePage} />
    </div>
  )
};

export default LandingPage;