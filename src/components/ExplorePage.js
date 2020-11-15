import { makeStyles } from '@material-ui/core/styles';
import CardGrid from './CardGrid';
import Grid from '@material-ui/core/Grid';
import Filters from './Filters';
import Header from './Header';
import { useContext } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { sessionContext } from './SessionContext';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop:"70px", 
    flexGrow:1
  },
  filter: {
    paddingBottom:"80px"
  }
}));

function ExplorePage() {
  const classes = useStyles();
  const {value} = useContext(sessionContext);
  const history = useHistory();

  return (
    <div>
      {window.sessionStorage.getItem('userLoggedIn') === 'true' &&
        <>
          <Header />
          <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12} sm={2} style={{marginBottom: 80}}>
              <Filters /> 
            </Grid>
            <Grid item xs={12} sm={10}>
              <CardGrid />
            </Grid>
          </Grid>
        </>
      }
      {window.sessionStorage.getItem('userLoggedIn') !== 'true' && 
        <>
          <Redirect to='/login' />
        </>
      }
    </div>
  );
}

export default ExplorePage;
