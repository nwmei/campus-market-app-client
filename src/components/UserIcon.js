import React from 'react';
import {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { Grid, } from '@material-ui/core';
import { sessionContext } from './SessionContext';
import Button from '@material-ui/core/Button';
import {StyledBadge, useStyles} from "./styles/UserIconStyles";

function UserIcon({clearUserDetails}) {
  const classes = useStyles();
  const {sessionContextValue, clearSessionContext} = useContext(sessionContext);
  const history = useHistory();

  const logoutHandler = () => {
    clearSessionContext();
    clearUserDetails();
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
          {
            sessionContextValue.imageUrl === 'not available'
              ? <Avatar className={classes.orange}>{sessionContextValue.userInitials}</Avatar>
              : <Avatar  src={sessionContextValue.imageUrl} alt={sessionContextValue.imageUrl} />
          }
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