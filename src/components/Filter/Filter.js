import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import RadioGroupControl from '../controls/RadioGroup';
import Paper from "@material-ui/core/Paper";
import Input from "../controls/Input";
import Button from "../controls/Button";
import {useForm} from "../UseForm";
import {campuses, campusPairs} from "../constants";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: { boxShadow: "none"}
}));

const initialItemValues = {
  minPrice: '',
  maxPrice: ''
};

const Filter = ({expandedFilter, setExpandedFilter, filterClass, filterType, options=null, updateFilters, filterObject}) => {
  const isExpanded = expandedFilter===filterType;
  const classes = useStyles();

  const toggleExpanded = () => {
    isExpanded ? setExpandedFilter("") : setExpandedFilter(filterType);
  };

  const {
    values,
    handleInputChange,
    resetForm
  } = useForm(initialItemValues);

  const handleFormSubmit = e => {
    e.preventDefault()
    toggleSelected([values.minPrice, values.maxPrice]);
  }

  const toggleSelected = (selectionId) => {
    if (selectionId) {
      let label;
      if (filterClass==='selection') {
        if (filterType === 'Campus') {
          label = campusPairs[selectionId].title
        } else {
          label = selectionId
        }
      } else {
        label = `${filterType}: $${selectionId[0]} - $${selectionId[1]}`
      }
      updateFilters(
        {
          filterClass,
          filterType,
          value: filterObject.value,
          label
        },
        {
          filterClass,
          filterType,
          value: selectionId,
          label
        }
      );
    }
  };

  return (
    <Accordion expanded={isExpanded}>
      <AccordionSummary  expandIcon={<ExpandMoreIcon />} onClick={toggleExpanded}>
        <Typography className={classes.heading}>{filterType}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {
          filterClass==="selection"
            ?
            <Paper className={classes.paper} style={{maxHeight: 330, overflow: 'auto', borderColor: "#000"}} >
              <RadioGroupControl
                component='filter'
                name={filterType}
                value={filterObject.value}
                onClick={(e) => {
                    toggleSelected(e.target.value)
                  }
                }
                items={options || []}
              />
              {
                filterType === 'Neighborhood' && options && options.length === 0 &&
                <Typography variant='caption'>select a campus first!</Typography>
              }
            </Paper>
            :
            <Grid container>
              <Grid item xs={4}>
                <Input name="minPrice" value={values.minPrice} onChange={handleInputChange} size="small" label="min" margin="dense" />
              </Grid>
              <Grid item xs={4}>
                <Input name="maxPrice" value={values.maxPrice} onChange={handleInputChange} label="max" margin="dense" />
              </Grid>
              <Grid item xs={4}>
                <Button onClick={handleFormSubmit} size="medium" text="go"/>
              </Grid>
            </Grid>
        }
      </AccordionDetails>
    </Accordion>
  );
};

export default Filter;
