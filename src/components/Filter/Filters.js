import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Filter from "./Filter";
import filterOptions from "./FilterOptions";

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
  }
}));

export default function Filters() {
  const [expandedFilter, setExpandedFilter] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const classes = useStyles();

  const updateFilters = (oldFilter, newFilter) => {
    const newActiveFilters = activeFilters.filter(activeFilter => {
      return activeFilter.value !== oldFilter.value
    });
    if (oldFilter.value !== newFilter.value) {
      newActiveFilters.push(newFilter);
    }
    setActiveFilters(newActiveFilters)
  };

  return (
    <div className={classes.root}>
      <p className={classes.filterText}>filters</p>
      {
        activeFilters.map((filter, key) => <p key={key}>{filter.value}</p>)
      }
      <Paper style={{maxHeight: 650, overflow: 'auto'}} >
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
                options={filterOption.options}
              />
            )
          })
        }
      </Paper>
    </div>
  );
}
