import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import Popup from './Popup';
import { gradientColor } from "./constants";
import {
  useWindowWidth,
} from '@react-hook/window-size'
import {showFilterModal} from "../utils/HelperMethods";
import Filters from "./Filter/Filters";
import SearchIcon from '@material-ui/icons/Search';
import Typography from "@material-ui/core/Typography";
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import ButtonControl from "../../src/components/controls/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'flex',
    '&:hover': {
      background: gradientColor
    },
    border: 'solid 1px #0fae15',
    borderRadius: 50,
  },
  addButton: props => ({
    '&:hover': {
      color: 'white'
    },
    color: '#0fae15',
    fontSize: props.showFilterModal ? 100 : 200,
  }),
}));

const FiltersModal = ({filters, updateFilters, clearFilters}) => {
  const innerWidth = useWindowWidth();
  const [activated, setActivated] = useState(false);
  const classes = useStyles({showFilterModal: showFilterModal(innerWidth)});

  return (
    <div>
      <Button className={classes.root} onClick={() => setActivated(true)} >
        <Grid container alignItems="center">
          <Grid item>
            <FilterListRoundedIcon className={classes.addButton} />
          </Grid>
        </Grid>
      </Button>
      <Typography variant="subtitle1">
        refine
      </Typography>
      <Popup isOpen={activated} title='Refine search' >
        <Filters filters={filters} updateFilters={updateFilters} clearFilters={clearFilters}/>
        <ButtonControl text="View results" color='black' onClick={() => setActivated(false)}/>
      </Popup>
    </div>
  );
}

export default FiltersModal;
