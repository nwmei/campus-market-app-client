import React, {useState, useEffect, useContext} from 'react'
import { Grid, } from '@material-ui/core';
import { useForm, Form } from './UseForm';
import InputControl from './controls/Input';
import RadioGroupControl from './controls/RadioGroup';
import SelectControl from './controls/Select';
import ButtonControl from './controls/Button';
import {categories, neighborhoods} from "../../src/components/constants";
import {sessionContext} from "../../src/components/SessionContext";

export default function EditItemForm(props) {
  const { itemId, setIsOpen, editItemHandler, deleteItemHandler, itemName, price, description, imageUrls, category, neighborhood, } = props;
  const {sessionContextValue} = useContext(sessionContext);

  const initialItemValues = {
    itemName,
    description,
    price,
    category,
    neighborhood
  };


  const {
    values,
    setValues,
    handleInputChange,
    resetForm
  } = useForm(initialItemValues);

  const editClickHandler = e => {
    e.preventDefault();
    resetForm();
    setIsOpen(false);
    editItemHandler({...values, imageUrls});
  };

  const deleteClickHandler = e => {
    e.preventDefault();
    resetForm();
    setIsOpen(false);
    deleteItemHandler();
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Grid container>
        <Grid item xs={6}>
          <InputControl
            variant="standard"
            name="itemName"
            label="Item name"
            value={values.itemName}
            onChange={handleInputChange}
          />
          <InputControl
            variant="standard"
            name="description"
            label="Description"
            value={values.description}
            onChange={handleInputChange}
          />
          <InputControl
            variant="standard"
            name="price"
            label="price"
            value={values.price}
            onChange={handleInputChange}
          />
          <div style={{paddingRight: 40}}>
            <SelectControl
              name="category"
              label="Category"
              value={values.category}
              onChange={handleInputChange}
              options={categories}
            />
          </div>
          <SelectControl
            name="neighborhood"
            label="Neighborhood"
            value={values.neighborhood}
            onChange={handleInputChange}
            options={neighborhoods[sessionContextValue.school]}
          />

        </Grid>
        <Grid item xs={6}>
          {/* <RadioGroupControl
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={[{id: '1', title: 'option1'}, {id: '2', title: 'option2'}, {id: '3', title: 'option3'}]}
                    /> */}
          {/*<SelectControl*/}
          {/*    name=""*/}
          {/*    label="imageUrl"*/}
          {/*    value={values.imageUrl}*/}
          {/*    onChange={handleInputChange}*/}
          {/*    options={[{id: '1', title: 'option1'}, {id: '2', title: 'option2'}, {id: '3', title: 'option3'}]}*/}
          {/*/>*/}
          {/*<InputControl*/}
          {/*  variant="standard"*/}
          {/*  name="imageUrl"*/}
          {/*  label="image url"*/}
          {/*  value={values.imageUrl}*/}
          {/*  onChange={handleInputChange}*/}
          {/*/>*/}

          {
            imageUrls.map((imgUrl, key) => {
              return (<img key={key} className="imageToUpload" src={imgUrl} alt="no images" height="100" width="100"/>)
            })
          }

          <div>
            <ButtonControl
              text="Edit"
              onClick={editClickHandler}
            />
            <ButtonControl
              text="Delete"
              onClick={deleteClickHandler}
            />
            <ButtonControl
              text="Cancel"
              color="default"
              onClick={() => setIsOpen(false)} />
          </div>
        </Grid>
      </Grid>
    </Form>
  )
}