import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Grid } from "@material-ui/core";
import Popup from './Popup';
import { useMutation } from '@apollo/client';
import EditItemMutation from '../mutations/EditItem.graphql';
import DeleteItemMutation from '../mutations/DeleteItem.graphql';
import { useContext } from 'react';
import { sessionContext } from './SessionContext';
import AddItemForm from './AddItemForm';
import { gradientColor } from "./constants";
import MuiLink from "@material-ui/core/Link";
import EditItemForm from "./EditItemForm";

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

export default function EditCard(props) {
  const { itemId, itemName, price, seller, description, imageUrl, date, daysAgo, likes, enterable, category, neighborhood, refetchStoreItems } = props;
  const [activated, setActivated] = useState(false);
  const classes = useStyles();

  const {sessionContextValue} = useContext(sessionContext);

  const [editItem, {data: editData}] = useMutation(EditItemMutation);
  const [deleteItem, {data: deleteData}] = useMutation(DeleteItemMutation);

  useEffect(() => {
    if (editData || deleteData) {
      refetchStoreItems();
    }
  }, [editData, deleteData]);

  const editItemHandler = (data) => {
    const {itemName, description, imageUrl, price, category, neighborhood} = data;
    editItem({
      variables: {
        input: {
          id: itemId,
          name: itemName,
          description,
          price: parseInt(price),
          imageUrl,
          category,
          neighborhood
        }
      }
    })
  };

  const deleteItemHandler = () => {
    deleteItem({
      variables: {
        input: {
          id: itemId
        }
      }
    })
  };

  return (
    <>
      <MuiLink onClick={() => setActivated(true)}>
        edit
      </MuiLink>
      <Popup isOpen={activated} title='Edit/Delete Item' >
        <EditItemForm
          setIsOpen={setActivated}
          editItemHandler={editItemHandler}
          deleteItemHandler={deleteItemHandler}
          itemName={itemName}
          description={description}
          price={price}
          imageUrl={imageUrl}
          category={category}
          neighborhood={neighborhood}
        />
      </Popup>
    </>
  );
}