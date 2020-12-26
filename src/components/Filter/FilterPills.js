import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

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

  const handleDelete = ({filterClass, filterType, value}) => {
    console.info('You clicked the delete icon.');
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

  const handleClick = () => {
    console.info('You clicked the Chip.');
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
