import { useHistory } from 'react-router-dom';
import GoogleLogin from './LoginButton';
import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    paddingTop: "80px"
  },
}))

const LandingPage = ({setLoggedIn, accessToken}) => {
  const classes = useStyles();
  const history = useHistory();
  const navigateToExplorePage = () => {
    setLoggedIn(true)
    history.push('/explore')
  }
  return (
    <div className={classes.button}>
      <GoogleLogin navigateAfterLogin={navigateToExplorePage} />
    </div>
  )
};

export default LandingPage;