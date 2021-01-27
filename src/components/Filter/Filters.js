import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Filter from "./Filter";
import filterOptions from "./FilterOptions";
import MuiLink from "@material-ui/core/Link";
import {neighborhoods} from "../constants";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '15%',
    position: "fixed",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  spacing: {
    marginBottom: 5
  },
  filterText: {
    paddingLeft: 10,
    paddingBottom: 0
  },
}));

export default function Filters({filters, updateFilters, clearFilters}) {
  const [expandedFilter, setExpandedFilter] = useState("");
  const classes = useStyles();

  const campusSelected = () => {
    return filters.filter(filter => filter.filterType === 'Campus').length > 0;
  };

  const determineOptions = (filterOption) => {
    if (filterOption.filterType === 'Neighborhood') {
      if (campusSelected()) {
        return neighborhoods[filters.filter(filter => filter.filterType === 'Campus')[0].value]
      } else {
        return [];
      }
    } else {
      return filterOption.options;
    }

  };

  return (
    <div className={classes.root}>
      {
        filters.length > 0 ?
          <MuiLink  onClick={clearFilters}>
            <Typography className={classes.filterText} variant="subtitle1">clear filters</Typography>
          </MuiLink>
          :
          //<p className={classes.filterText}>filters</p>
          <Typography className={classes.filterText} variant="subtitle1">filters</Typography>
      }

      <Paper >
        {
          filterOptions.map((filterOption, key) => {
            return (
              <Filter
                key={key}
                updateFilters={updateFilters}
                expandedFilter={expandedFilter}
                setExpandedFilter={setExpandedFilter}
                filterClass={filterOption.filterClass}
                filterType={filterOption.filterType}
                options= {determineOptions(filterOption)}
                filterObject={filters.filter(filter => filter.filterType===filterOption.filterType)[0] || {value: ""}}
              />
            )
          })
        }
      </Paper>

    </div>
  );
}
