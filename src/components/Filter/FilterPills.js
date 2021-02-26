import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),

    },
  },
  pill: {
    color: 'black',
    background: 'linear-gradient(45deg, #ff1744  30%,  #ffc107 90%)',
  }
}));

export default function Chips({filters, updateFilters}) {
  const classes = useStyles();
  console.log(filters)

  const handleDelete = ({filterClass, filterType, value}) => {
    const label = filterClass==='selection' ? value : `${filterType}: $${value[0]} - $${value[1]}`;
    updateFilters(
      {
        filterClass,
        filterType,
        value,
        label
      },
      {
        filterClass,
        filterType,
        value,
        label
      }
    );
  };

  return (
    <div className={classes.root}>
      {
        filters.map((filter, key) => {
          return (
          <Chip
            className={classes.pill}
            key={key}
            label={filter.label}
            onDelete={() => handleDelete(filter)}
          />
          )
        })
      }
    </div>
  );
}
