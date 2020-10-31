import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PublicIcon from '@material-ui/icons/Public';
import PersonIcon from '@material-ui/icons/Person';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStylesHeader from './HeaderStyles';
import GoogleLogin from './LoginButton';
import SearchBar from './SearchBar';

const MenuAppBar = () => {
  const classes = useStylesHeader();
  
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.topBar}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Smarter Trade
          </Typography>
          <Button size='small' variant="outlined" className={classes.button} startIcon={<PublicIcon />} href='/'>
            Explore
          </Button>
          <Button size='small' variant="outlined" className={classes.button} startIcon={<PersonIcon />} href='/single'>
            My Items
          </Button>
          <Button size='small' variant="outlined" className={classes.button} startIcon={<MoreHorizIcon />} href='/about'>
            About App
          </Button>

          <SearchBar />
          <div className={classes.grow} />

          <GoogleLogin />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MenuAppBar;