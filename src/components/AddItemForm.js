import React, {useState, useEffect, useContext} from 'react'
import { Grid, } from '@material-ui/core';
import { useForm, Form } from './UseForm';
import InputControl from './controls/Input';
import RadioGroupControl from './controls/RadioGroup';
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

    const {
        values,
        setValues,
        handleInputChange,
        resetForm
    } = useForm(initialItemValues);

    const handleFormSubmit = (urls) => {
        resetForm();
        setIsOpen(false);
        values.neighborhood = neighborhoods[sessionContextValue.school][values.neighborhood-1].title;
        values.category = categories[values.category-1].title;
        addItemHandler({...values, imageUrls: urls});
    };

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
                        name="itemName"
                        label="Item name"
                        value={values.itemName}
                        onChange={handleInputChange}
                    />
                    <InputControl
                        name="description"
                        label="Description"
                        value={values.description}
                        onChange={handleInputChange}
                    />
                    <InputControl
                        name="price"
                        label="price"
                        value={values.price}
                        onChange={handleInputChange}
                    />
                    <SelectControl
                      name="category"
                      label="Category"
                      value={values.category}
                      onChange={handleInputChange}
                      options={categories}
                    />
                    <SelectControl
                      name="neighborhood"
                      label="Neighborhood"
                      value={values.neighborhood}
                      onChange={handleInputChange}
                      options={neighborhoods[sessionContextValue.school]}
                    />
                </Grid>
                <Grid item xs={6}>

                    <div>
                        <ImageUpload submitHandler={handleFormSubmit} imageData={imageData} setImageData={setImageData}/>
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