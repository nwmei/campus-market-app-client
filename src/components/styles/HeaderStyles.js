import { makeStyles, fade } from '@material-ui/core/styles';

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
  title: {
    fontFamily: 'roboto'
  },
  button: {
    margin: theme.spacing(1),
    fontSize: 12,
    border:0,
    background: 'white',
    color: 'green'
  },
  topBar: {
    background: 'linear-gradient(45deg, #42a5f5 30%, #90caf9 90%)',
  },
}));

export default useStyles;
