import React from "react";
import pic from '../components/defaultPic.jpeg'

export const getAlternateImageUrl = () => {
    //const index = Math.floor(Math.random() * 100);
    //return `https://source.unsplash.com/random/200x200?sig=1`;
    return pic;
};

export const getImageUrl = (imageUrl) => {
    if (imageUrl.length > 4) {
        return imageUrl
    } else {
        return getAlternateImageUrl();
    }
};

export const isMobile = (width) => {
    return width < 1100;
};
