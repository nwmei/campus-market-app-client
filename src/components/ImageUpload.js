import React, {useState} from 'react';
import {storage} from "../firebase";
import ButtonControl from "./controls/Button";
import "./styles.css";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const ImageUpload = ({submitHandler, imageData, setImageData, error}) => {

  const ErrorTypography = withStyles({
    root: {
      color: "#FF0000"
    }
  })(Typography);

  const changeHandler = (e) => {
    if (e.target.files[0]) {
      const datePrefix = Date.now().toString();
      const uploadFileName = `${datePrefix}${e.target.files[0].name}`;
      const uploadTask = storage.ref(`images/${uploadFileName}`).put(e.target.files[0]);
      uploadTask.on('state_changed',
        (snapshot) => {}, (error) => {
          console.log(error)
        }, () => {
          storage.ref('images').child(uploadFileName).getDownloadURL().then(url => {
            setImageData({
              urls: [...imageData.urls, url]
            });
          })
        });
    }
  };

  const uploadHandler = () => {
    submitHandler(imageData.urls)
  };

  return (
    <div>
      {
        imageData.urls && imageData.urls.map((imgUrl, key) => {
          return (<img key={key} className="imageToUpload" src={imgUrl} alt="no images" height="100" width="100"/>)
        })
      }

      <input disabled={imageData.urls.length >= 5} type="file" onChange={changeHandler}/>
      {
        error &&
        <ErrorTypography variant="subtitle2">please upload a valid image</ErrorTypography>
      }
      <ButtonControl
        disabled={imageData.urls.length===0}
        text="Submit"
        color="default"
        onClick={uploadHandler} />
      {/*<button onClick={uploadHandler}>Upload Image</button>*/}
    </div>
  )
};

export default ImageUpload;
