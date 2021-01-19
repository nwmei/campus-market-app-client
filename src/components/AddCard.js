import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Grid } from "@material-ui/core";
import Popup from './Popup';
import { useMutation } from '@apollo/client';
import CreateStoreItemMutation from '../mutations/CreateStoreItem.graphql';
import { useContext } from 'react';
import { sessionContext } from './SessionContext';
import AddItemForm from './AddItemForm';
import { gradientColor } from "./constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: '#e0e0e0',
    '&:hover': {
      background: gradientColor
    },
    borderRadius: 50
  },
  addButton: {
    color: 'white',
    fontSize: 200
  }
}));

export default function AddCard(props) {
  const [activated, setActivated] = useState(false);
  const classes = useStyles();

  const {sessionContextValue} = useContext(sessionContext);
  const [createStoreItem, {data}] = useMutation(CreateStoreItemMutation);

  useEffect(() => {
    if (data) {
      props.incrementItemsAdded();
    }
  }, [data]);

  const addItemHandler = (data) => {
    const {itemName, description, imageUrl, price, category="furniture", neighborhood="Warren Towers"} = data;
    createStoreItem({
      variables: {
        input: {
          name: itemName,
          price: parseInt(price),
          imageUrl,
          description,
          category,
          neighborhood,
          seller: {
            id: sessionContextValue.userId,
            firstName: sessionContextValue.userFirstName,
            lastName: sessionContextValue.userLastName,
            emailAddress: sessionContextValue.userEmailAddress,
            imageUrl: sessionContextValue.imageUrl
          }
        }
      }
    })
  };

  return (
    <div>
      <Button className={classes.root} onClick={() => setActivated(true)} >
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <AddIcon className={classes.addButton} /> 
          </Grid>
          <Grid item>
            Add Item
          </Grid>
        </Grid>
      </Button>
      <Popup isOpen={activated} title='Add Item' >
        <AddItemForm setIsOpen={setActivated} addItemHandler={addItemHandler} />
      </Popup>
    </div>
  );
}