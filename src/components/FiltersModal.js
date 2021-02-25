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
import FilterListIcon from '@material-ui/icons/FilterList';
import {Form} from "../../src/components/UseForm";
import ButtonControl from "../../src/components/controls/Button";
import {storage} from "../../src/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'flex',
    '&:hover': {
      background: gradientColor
    },
    border: 'solid 1px #3d5afe',
    borderRadius: 50,
  },
  addButton: props => ({
    '&:hover': {
      color: 'white'
    },
    color: '#3d5afe',
    fontSize: props.showFilterModal ? 100 : 200,
  }),
}));

const FiltersModal = ({filters, updateFilters, clearFilters}) => {
  const innerWidth = useWindowWidth();
  const [activated, setActivated] = useState(false);
  const classes = useStyles({showFilterModal: showFilterModal(innerWidth)});

  // not used, only to satisfy form
  const handleFormSubmit2 = (e) => {
    e.preventDefault();
    setActivated(false);
  };

  const cancelHandler = () => {
    setActivated(false);
  };


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
        <ButtonControl text="View results" onClick={() => setActivated(false)}/>
      </Popup>
    </div>
  );
}

export default FiltersModal;
