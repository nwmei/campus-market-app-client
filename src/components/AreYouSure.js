import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CommentUnit from './CommentUnit';
import {Form} from "../../src/components/UseForm";
import {Grid} from "@material-ui/core";
import InputControl from "../../src/components/controls/Input";
import SelectControl from "../../src/components/controls/Select";
import {categories, neighborhoods} from "../../src/components/constants";
import ImageUpload from "../../src/components/ImageUpload";
import ButtonControl from "../../src/components/controls/Button";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../src/components/Popup";
import AddItemForm from "../../src/components/AddItemForm";

const AreYouSure = ({isOpen, onClose, deleteHandler}) => {

  const handleFormSubmit2 = (e) => {
    e.preventDefault();
  };

  return (
    <Popup isOpen={isOpen} title='Delete comment?' >
      <Form onSubmit={handleFormSubmit2}>
        <Grid container>
          <Grid item xs={6}>
            <div>
              <ButtonControl
                text="Yes"
                color="default"
                onClick={deleteHandler} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <ButtonControl
                text="Cancel"
                color="default"
                onClick={onClose} />
            </div>
          </Grid>
        </Grid>
      </Form>
    </Popup>

  )

}

export default AreYouSure;
