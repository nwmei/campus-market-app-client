import React, {useState} from 'react';
import {storage} from "../firebase";

const ImageUpload = ({submitHandler}) => {
  const [imageData, setImageData] = useState({image: null, url: ''});

  const changeHandler = (e) => {
    if (e.target.files[0]) {
      const oldState = {...imageData};
      setImageData({
        image: e.target.files[0],
        url: oldState.url
      })
    }
  };

  const uploadHandler = (e) => {
    const uploadTask = storage.ref(`images/${imageData.image.name}`).put(imageData.image);
    uploadTask.on('state_changed',
      (snapshot) => {}, (error) => {
        console.log(error)
      }, () => {
        storage.ref('images').child(imageData.image.name).getDownloadURL().then(url => {
          submitHandler(url)
        })
      })
  };

  return (
    <div>
      <input type="file" onChange={changeHandler}/>
      <button onClick={uploadHandler}>Upload Image</button>
    </div>
  )
};

export default ImageUpload;
