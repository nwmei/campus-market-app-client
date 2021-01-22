import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import { useForm, Form } from './UseForm';
import InputControl from './controls/Input';
import RadioGroupControl from './controls/RadioGroup';
import SelectControl from './controls/Select';
import ButtonControl from './controls/Button';
import ImageUpload from "./ImageUpload";
import {storage} from "../firebase";

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

    const {
        values,
        setValues,
        handleInputChange,
        resetForm
    } = useForm(initialItemValues);

    const handleFormSubmit = (urls) => {
        resetForm();
        setIsOpen(false);
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
                    <InputControl
                      name="category"
                      label="category"
                      value={values.category}
                      onChange={handleInputChange}
                    />
                    <InputControl
                      name="neighborhood"
                      label="neighborhood"
                      value={values.neighborhood}
                      onChange={handleInputChange}
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
                    {/*    name="imageUrl"*/}
                    {/*    label="image url"*/}
                    {/*    value={values.imageUrl}*/}
                    {/*    onChange={handleInputChange}*/}
                    {/*/>*/}


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