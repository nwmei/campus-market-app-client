import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import PublicIcon from '@material-ui/icons/Public';
import PersonIcon from '@material-ui/icons/Person';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStylesHeader from './styles/HeaderStyles';
import SearchBar from './SearchBar';
import UserIcon from './UserIcon';
import {Link} from "react-router-dom";
import logo from './logo2.png'
import {
  useWindowWidth,
} from '@react-hook/window-size'
import { isMobile } from "../utils/HelperMethods";
import "./styles.css"
import MobileMenu from './MobileMenu'

const determineLabel = (label, width) => {
  if (width < 1100) {
    return '';
  } else if (width < 1131) {
    if (label === 'About App') return 'About';
  }
  return label;
};

const determineLogo = (width) => {
  console.log(width)
  if (width < 480) {
    return "photoMobile"
  } else {
    return "photo";
  }
};

const MenuAppBar = ({clearUserDetails}) => {
  const width = useWindowWidth();
  const classes = useStylesHeader();
  const isMobileView = isMobile(width);

  return (
    isMobileView
      ?
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.topBar}>
          <Toolbar>
            <MobileMenu/>
            <Link to="/explore">
              <img src={logo} className={determineLogo(width)}/>
            </Link>

            <div className={classes.grow} />

            <UserIcon clearUserDetails={clearUserDetails}/>
          </Toolbar>
        </AppBar>
      </div>
      :
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.topBar}>
          <Toolbar>
            <Link to="/explore">
              <img src={logo} className="photo"/>
            </Link>
            <Button size='small' variant="outlined" className={classes.button} startIcon={<PublicIcon />} href='/explore'>
              {determineLabel('Marketplace', width)}
            </Button>
            <Button size='small' variant="outlined" className={classes.button} startIcon={<PersonIcon />} href='/myItems'>
              {determineLabel('My items', width)}
            </Button>
            <Button size='small' variant="outlined" className={classes.button} startIcon={<MoreHorizIcon />} href='/about'>
              {determineLabel('About App', width)}
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