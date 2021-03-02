import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import { Grid } from "@material-ui/core";
import Popup from './Popup';
import { useMutation } from '@apollo/client';
import CreateStoreItemMutation from '../mutations/CreateStoreItem.graphql';
import { useContext } from 'react';
import { sessionContext } from './SessionContext';
import AddItemForm from './AddItemForm';
import { gradientColor } from "./constants";
import {
  useWindowWidth,
} from '@react-hook/window-size'
import {showFilterModal} from "../utils/HelperMethods";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'flex',
    '&:hover': {
      background: gradientColor
    },
    border: 'solid 1px green',
    borderRadius: 50,
  },
  addButton: props => ({
    '&:hover': {
      color: 'white'
    },
    color: 'green',
    paddingRight: props.showFilterModal ? 10 : 40,
    paddingLeft: props.showFilterModal ? 10 : 40,
    fontSize: props.showFilterModal ? 100 : 200,
  })
}));

export default function AddCard({refetch}) {
  const innerWidth = useWindowWidth();
  const [activated, setActivated] = useState(false);
  const classes = useStyles({showFilterModal: showFilterModal(innerWidth)});

  const {sessionContextValue} = useContext(sessionContext);
  const [createStoreItem, {data}] = useMutation(CreateStoreItemMutation);

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data]);

  const addItemHandler = (data) => {
    const {itemName, description, imageUrls, price, category, neighborhood} = data;
    createStoreItem({
      variables: {
        input: {
          name: itemName,
          price: parseInt(price),
          imageUrls,
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
        <Grid container alignItems="center">
          <Grid item>
            <AddAPhotoOutlinedIcon className={classes.addButton} />
            {
              !showFilterModal(innerWidth) &&
                <Typography variant="subtitle2">
                  create post
                </Typography>
            }
          </Grid>
        </Grid>
      </Button>
      {
        showFilterModal(innerWidth) &&
          <Typography variant="subtitle1">
            post
          </Typography>
      }
      <Popup isOpen={activated} title='Add Item' >
        <AddItemForm setIsOpen={setActivated} addItemHandler={addItemHandler} />
      </Popup>
    </div>
  );
}