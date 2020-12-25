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
    color: 'white',
    background: 'linear-gradient(45deg, #ff1744  30%,  #ffc107 90%)',
  }
}));

export default function Chips({filters}) {
  const classes = useStyles();

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
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
            label={filter.value}
            onDelete={handleDelete}
          />
          )
        })
      }


    </div>
  );
}
