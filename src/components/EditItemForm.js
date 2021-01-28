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
  const [errors, setErrors] = useState({
    itemName: false,
    description: false,
    price: false,
    images: false,
    category: false,
    neighborhood: false
  });
  const [editAttempted, setEditAttempted] = useState(false);

  const errorText = {
    itemName: 'please enter a valid item name',
    description: 'please enter a valid description',
    price: 'please enter a valid price',
    images: 'please upload a valid image',
    category: 'please choose a category',
    neighborhood: 'please choose a neighborhood'
  };

  const initialItemValues = {
    itemName,
    description,
    price: price.toString(),
    category,
    neighborhood
  };

  const {
    values,
    setValues,
    handleInputChange,
    resetForm
  } = useForm(initialItemValues);

  const validateInputs = () => {
    const itemNameValid = values.itemName.length > 0;
    const descriptionValid = values.description.length > 0;
    const priceValid = values.price.length > 0 && (/^\d*(?:\.\d{0,2})?$/.test(values.price));
    const categoryValid = values.category.length > 0;
    const neighborhoodValid = values.neighborhood.length > 0;
    const imagesValid = imageUrls.length > 0;

    setErrors({
      itemName: !itemNameValid,
      description: !descriptionValid,
      price: !priceValid,
      category: !categoryValid,
      neighborhood: !neighborhoodValid,
      images: !imagesValid,
    });

    return itemNameValid && descriptionValid && priceValid && imagesValid && categoryValid && neighborhoodValid;
  };

  useEffect(() => {
    if (editAttempted) {
      allFieldsValid();
    }
  }, [values]);

  const allFieldsValid = () => {
    return validateInputs();
  };

  const editClickHandler = e => {
    e.preventDefault();
    setEditAttempted(true);
    if (allFieldsValid()) {
      setIsOpen(false);
      editItemHandler({...values, imageUrls});
    }
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
            inputProps = {{ maxLength: 40 }}
            error={errors.itemName}
            variant="standard"
            name="itemName"
            label="Item name"
            value={values.itemName}
            onChange={handleInputChange}
          />
          <InputControl
            inputProps = {{ maxLength: 200 }}
            error={errors.description}
            variant="standard"
            name="description"
            label="Description"
            value={values.description}
            onChange={handleInputChange}
          />
          <InputControl
            inputProps = {{ maxLength: 8 }}
            error={errors.price}
            variant="standard"
            name="price"
            label="price"
            value={values.price}
            onChange={handleInputChange}
          />
          <div style={{paddingRight: 40}}>
            <SelectControl
              error={errors.category}
              helperText={errorText.category}
              name="category"
              label="Category"
              value={values.category}
              onChange={handleInputChange}
              options={categories}
            />
          </div>
          <SelectControl
            error={errors.neighborhood}
            helperText={errorText.neighborhood}
            name="neighborhood"
            label="Neighborhood"
            value={values.neighborhood}
            onChange={handleInputChange}
            options={neighborhoods[sessionContextValue.school]}
          />
        </Grid>
        <Grid item xs={6}>
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