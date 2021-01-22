import React, {useState} from 'react';
import {storage} from "../firebase";
import ButtonControl from "./controls/Button";
import "./styles.css";

const ImageUpload = ({submitHandler}) => {
  const [imageData, setImageData] = useState({images: [], urls: []});
  console.log(imageData.urls)

  const changeHandler = (e) => {
    if (e.target.files[0]) {
      const uploadTask = storage.ref(`images/${e.target.files[0].name}`).put(e.target.files[0]);
      uploadTask.on('state_changed',
        (snapshot) => {}, (error) => {
          console.log(error)
        }, () => {
          storage.ref('images').child(e.target.files[0].name).getDownloadURL().then(url => {
            setImageData({
              images: [],
              urls: [...imageData.urls, url]
            });
          })
        });

    }
  };

  const uploadHandler = (e) => {
    // const uploadTask = storage.ref(`images/${imageData.image.name}`).put(imageData.image);
    // uploadTask.on('state_changed',
    //   (snapshot) => {}, (error) => {
    //     console.log(error)
    //   }, () => {
    //     storage.ref('images').child(imageData.image.name).getDownloadURL().then(url => {
    //       submitHandler(url)
    //     })
    //   })
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
