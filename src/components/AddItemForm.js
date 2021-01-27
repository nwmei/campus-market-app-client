import React, {useState, useEffect, useContext} from 'react'
import { Grid, } from '@material-ui/core';
import { useForm, Form } from './UseForm';
import InputControl from './controls/Input';
import SelectControl from './controls/Select';
import ButtonControl from './controls/Button';
import ImageUpload from "./ImageUpload";
import {storage} from "../firebase";
import {sessionContext} from "./SessionContext";
import {neighborhoods, categories, campuses} from "./constants";

const initialItemValues = {
  itemName: '',
  description: '',
  price: '',
  category: '',
  neighborhood: ''
};

export default function AddItemForm(props) {
    const { setIsOpen, addItemHandler } = props;
    const [imageData, setImageData] = useState({urls: []});
    const {sessionContextValue} = useContext(sessionContext);
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const errorText = {
        itemName: 'please enter a valid item name',
        description: 'please enter a valid description',
        price: 'please enter a valid price',
        images: 'please upload a valid image',
        category: 'please choose a category',
        neighborhood: 'please choose a neighborhood'
    };

    const [errors, setErrors] = useState({
        itemName: false,
        description: false,
        price: false,
        images: false,
        category: false,
        neighborhood: false
    });

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
        const imagesValid = imageData.urls.length > 0;

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
        if (submitAttempted) {
            allFieldsValid();
        }
    }, [values]);

    const allFieldsValid = () => {
        return validateInputs();
    };

    const handleFormSubmit = (urls) => {
        setSubmitAttempted(true);
        if (allFieldsValid()) {
            setIsOpen(false);
            addItemHandler({...values, imageUrls: urls});
        }
    };

    // not used, only to satisfy form
    const handleFormSubmit2 = (e) => {
        e.preventDefault();
        resetForm();
        setIsOpen(false);
    };

    const cancelHandler = () => {
        for (let imageUrl of imageData.urls) {
            storage.refFromURL(imageUrl).delete();
        }
        setIsOpen(false);
    };


    return (
        <Form onSubmit={handleFormSubmit2}>
            <Grid container>
                <Grid item xs={6}>
                    <InputControl
                        inputProps = {{ maxLength: 40 }}
                        error={errors.itemName}
                        helperText={errorText.itemName}
                        name="itemName"
                        label="Item name"
                        value={values.itemName}
                        onChange={handleInputChange}
                    />
                    <InputControl
                        inputProps = {{ maxLength: 200 }}
                        error={errors.description}
                        helperText={errorText.description}
                        name="description"
                        label="Description"
                        value={values.description}
                        onChange={handleInputChange}
                    />
                    <InputControl
                        inputProps = {{ maxLength: 8 }}
                        error={errors.price}
                        helperText={errorText.price}
                        name="price"
                        label="price"
                        value={values.price}
                        onChange={handleInputChange}
                    />
                    <SelectControl
                      error={errors.category}
                      helperText={errorText.category}
                      name="category"
                      label="Category"
                      value={values.category}
                      onChange={handleInputChange}
                      options={categories}
                    />
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
                    <div>
                        <ImageUpload submitHandler={handleFormSubmit} imageData={imageData} setImageData={setImageData} error={errors.images}/>
                        {/*<ButtonControl*/}
                        {/*    type="submit"*/}
                        {/*    text="Submit" />*/}
                        <ButtonControl
                            text="Cancel"
                            color="default"
                            onClick={cancelHandler} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}