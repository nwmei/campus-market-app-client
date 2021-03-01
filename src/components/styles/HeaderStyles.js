import { makeStyles, fade } from '@material-ui/core/styles';
import { gradientColor } from "../constants";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    width: 1,
    maxWidth: '10%',
    height: 1,

  },
  title: {
    fontFamily: 'roboto'
  },
  button: {
    margin: theme.spacing(1),
    fontSize: 12,
    border:0,
    background: 'white',
    color: 'green',
    borderRadius: 100
  },
  topBar: {
    background: gradientColor,
    zIndex: 1400
  },
  photo: {
    height: 45,
    width: 340,
    paddingRight: 10,
    marginLeft: 40
  },
  mobilePhoto: {
    height: 45,
    width: 340,
  }
}));

export default useStyles;
