import React, {useState} from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'flex',
    maxWidth: 345,
    //width: 305,
    //height: 380,
    backgroundColor: '#e0e0e0',
    '&:hover': {
      //backgroundColor: 'green',
  }
  },
  addButton: {
    color: 'white',
    fontSize: 200
  }
}));

export default function AddCard(props) {
  const [activated, setActivated] = useState(false);
  const classes = useStyles();

  const {value, setContextLoggedIn, setContextLoggedOut} = useContext(sessionContext);
  const [createStoreItem] = useMutation(CreateStoreItemMutation);

  const addItemHandler = (data) => {
    const {itemName, description, imageUrl, price} = data;
    createStoreItem({
      variables: {
        input: {
          name: itemName,
          price,
          imageUrl,
          description,
          seller: {
            id: value.userId,
            firstName: value.userFirstName,
            lastName: value.userLastName,
            emailAddress: value.userEmailAddress
          }
        }
      }
    })
    props.incrementItemsAdded();
  }

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