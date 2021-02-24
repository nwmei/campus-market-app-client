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
    //background: 'linear-gradient(45deg, #42a5f5 30%, #90caf9 90%)',
    //background: 'linear-gradient(45deg, #212121 30%, #424242 90%)',
    //background: 'linear-gradient(45deg,#f44336  30%,  #9c27b0 90%)',
    //background: 'linear-gradient(45deg,#f50057  30%,  #ffc107 90%)',
    background: gradientColor,
    zIndex: 1400
  },
}));

export default useStyles;
