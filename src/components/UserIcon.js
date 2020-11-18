import React from 'react';
import {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import { Grid, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { sessionContext } from './SessionContext';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    size: ''
  },
  margin: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  button: {
    fontSize: 9,
    border:0,
    paddingBottom: 0,
    paddingTop: 0,
  },
}));

function UserIcon() {
  const classes = useStyles();
  const {sessionContextValue, setSessionContext, clearSessionContext} = useContext(sessionContext);
  const history = useHistory();
  console.log(sessionContextValue.imageUrl)

  const logoutHandler = () => {
    clearSessionContext();
    localStorage.setItem("accessToken", "");
    history.push('/login')
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center">
        <Grid item> 
        <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot">
          <Avatar  src={sessionContextValue.imageUrl} alt={sessionContextValue.imageUrl} />
          </StyledBadge>
        </Grid>
        <Grid item>
        <Button size="small" className={classes.button} onClick={logoutHandler}>
          logout
        </Button>
        </Grid>
      </Grid>
    </div>
  )
};

export default UserIcon;