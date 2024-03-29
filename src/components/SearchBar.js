import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import useStylesSearch from './styles/SearchStyles';

const SearchBar = () => {
  const classes = useStylesSearch();
  
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase 
        placeholder="Search…"
        classes={{root: classes.inputRoot, input: classes.inputInput,}} 
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  )
}

export default SearchBar;