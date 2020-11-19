import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PublicIcon from '@material-ui/icons/Public';
import PersonIcon from '@material-ui/icons/Person';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStylesHeader from './styles/HeaderStyles';
import SearchBar from './SearchBar';
import UserIcon from './UserIcon';

const MenuAppBar = () => {
  const classes = useStylesHeader();
  
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.topBar}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Smarter Trade
          </Typography>
          <Button size='small' variant="outlined" className={classes.button} startIcon={<PublicIcon />} href='/explore'>
            Explore
          </Button>
          <Button size='small' variant="outlined" className={classes.button} startIcon={<PersonIcon />} href='/myItems'>
            My Items
          </Button>
          <Button size='small' variant="outlined" className={classes.button} startIcon={<MoreHorizIcon />} href='/about'>
            About App
          </Button>

          <SearchBar />
          <div className={classes.grow} />

          <UserIcon />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MenuAppBar;