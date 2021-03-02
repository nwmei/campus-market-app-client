import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Filter from "./Filter";
import filterOptions from "./FilterOptions";
import MuiLink from "@material-ui/core/Link";
import {neighborhoods} from "../constants";
import Typography from "@material-ui/core/Typography";
import {
  useWindowWidth,
} from '@react-hook/window-size'
import {showFilterModal} from "../../utils/HelperMethods";

const useStyles = makeStyles((theme) => ({
  root: props => (!props.showFilterModal ? {
    width: 195,
    position: "fixed",
  } : {}),
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
  const innerWidth = useWindowWidth();
  const [expandedFilter, setExpandedFilter] = useState("Campus");
  const classes = useStyles({showFilterModal: showFilterModal(innerWidth)});

  const campusSelected = () => {
    return filters.filter(filter => filter.filterType === 'Campus').length > 0;
  };

  const determineOptions = (filterOption) => {
    if (filterOption.filterType === 'Neighborhood') {
      if (campusSelected()) {
        console.log(filters.filter(filter => filter.filterType === 'Campus'))
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
            <MuiLink onClick={clearFilters}>
              <Typography className={classes.filterText} variant="subtitle1">clear filters</Typography>
            </MuiLink>
          :
          <>
            {
              !showFilterModal(innerWidth) &&
                <Typography className={classes.filterText} variant="subtitle1">filters</Typography>
            }
          </>
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
