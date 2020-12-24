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

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: { boxShadow: "none"}
}));

const Filter = ({expandedFilter, setExpandedFilter, filterClass, filterType, options=null, updateFilters}) => {
  const isExpanded = expandedFilter===filterType;
  const [value, setValue] = useState("");
  const classes = useStyles();

  const toggleExpanded = () => {
    isExpanded ? setExpandedFilter("") : setExpandedFilter(filterType);
  };

  const toggleSelected = (selection) => {
    if (selection) {
      updateFilters(
        {
          filterClass,
          filterType,
          value
        },
        {
          filterClass,
          filterType,
          value: selection
        }
      );

      if (value===selection) {
        setValue("");
      } else {
        setValue(selection);
      }
    }
  };

  const setRange = (low=0, high=1000000) => {
    setValue([low, high]);
    addFilter({
      filterClass,
      filterType,
      value: [low, high],
    });
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
                name={filterType}
                value={value}
                onClick={(e) => toggleSelected(e.target.value)}
                items={options}
              />
            </Paper>
            :
            <Grid container>
              <Grid item xs={4}>
                <Input label="min" margin="dense" />
              </Grid>
              <Grid item xs={4}>
                <Input label="max" margin="dense" />
              </Grid>
              <Grid item xs={4}>
                <Button text="go"/>
              </Grid>
            </Grid>
        }
      </AccordionDetails>
    </Accordion>
  );
};

export default Filter;
