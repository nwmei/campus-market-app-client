import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Filter from "./Filter";
import filterOptions from "./FilterOptions";
import MuiLink from "@material-ui/core/Link";

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

  return (
    <div className={classes.root}>
      {
        filters.length > 0 ?
          <MuiLink  onClick={clearFilters}>
            <p className={classes.filterText}>clear filters</p>
          </MuiLink>
          :
          <p className={classes.filterText}>filters</p>
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
                filterObject={filters.filter(filter => filter.filterType===filterOption.filterType)[0] || {value: ""}}
              />
            )
          })
        }
      </Paper>

    </div>
  );
}
