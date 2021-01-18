import { useHistory } from 'react-router-dom';
import GoogleLogin from './LoginButton';
import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    paddingTop: "80px"
  },
}))

const LandingPage = ({ setSessionQueryResponded }) => {
  const classes = useStyles();
  const history = useHistory();

  const navigateToExplorePage = () => {
    setSessionQueryResponded(false);
    history.push('/explore');
  };
  return (
    <div className={classes.button}>
      <h1>Welcome to campusmarketapp.com! Please log in.</h1>
      <GoogleLogin navigateAfterLogin={navigateToExplorePage} />
    </div>
  )
};

export default LandingPage;