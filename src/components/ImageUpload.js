import React, {useState} from 'react';
import {storage} from "../firebase";
import ButtonControl from "./controls/Button";
import "./styles.css";

const ImageUpload = ({submitHandler, imageData, setImageData}) => {


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
