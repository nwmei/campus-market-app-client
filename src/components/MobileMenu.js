import React, {useContext} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Toolbar from "@material-ui/core/Toolbar";
import {
  useWindowWidth,
} from '@react-hook/window-size';
import PublicIcon from "@material-ui/icons/Public";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from '@material-ui/icons/Search';
import {sessionContext} from "../../src/components/SessionContext";
import {Link} from 'react-router-dom';

const options = [
  'Marketplace',
  'My Items',
  'About App',
  'Filter/ Search'
];

const useStyles = makeStyles(theme => ({
  menu: {
    paddingLeft: 0,
    paddingRight: 5
  },
  menuItems: {
    marginTop: 50,
  },
}));

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const innerWidth = useWindowWidth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const determineMenuOptions = () => {
      return [
        ['Marketplace', <PublicIcon />, {to: '/explore'}],
        ['My Items', <PersonIcon />, {to: '/myItems'}],
        ['About App', <MoreHorizIcon />, {to: '/about'}],
      ]
  };

  const handleClick = (event) => {
    if (anchorEl === null) {
      setAnchorEl(event.currentTarget);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        className={classes.menu}
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon fontSize="large"/>
      </IconButton>
      <Menu
        className={classes.menuItems}
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {determineMenuOptions().map((option, key) => (
          <MenuItem key={key} selected={option === 'Pyxis'} onClick={handleClose}>
            <Button component={Link} size='small' variant='text' className={classes.button} startIcon={option[1]} {...option[2]}>
              {option[0]}
            </Button>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
