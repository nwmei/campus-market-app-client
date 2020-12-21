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
import CardMedia from "@material-ui/core/CardMedia";
import {getAlternateImageUrl} from "../utils/HelperMethods";
import {Link} from "react-router-dom";
import MuiLink from '@material-ui/core/Link';
import logo from './testLogo4.png'

import "./styles.css"

const MenuAppBar = ({clearUserDetails}) => {
  const classes = useStylesHeader();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.topBar}>
        <Toolbar>
          {/*<Typography variant="h4" className={classes.title}>*/}
          {/*  festive trade*/}
          {/*</Typography>*/}
          <Link to="/explore">
            <img src={logo} className="photo"/>
          </Link>
          <Button size='small' variant="outlined" className={classes.button} startIcon={<PublicIcon />} href='/explore'>
            Marketplace
          </Button>
          <Button size='small' variant="outlined" className={classes.button} startIcon={<PersonIcon />} href='/myItems'>
            My Items
          </Button>
          <Button size='small' variant="outlined" className={classes.button} startIcon={<MoreHorizIcon />} href='/about'>
            About festive
          </Button>

          <SearchBar />
          <div className={classes.grow} />

          <UserIcon clearUserDetails={clearUserDetails}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MenuAppBar;