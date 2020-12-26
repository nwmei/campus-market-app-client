import React from "react";
import pic from '../components/defaultPic.jpeg'
import {campuses} from "../components/constants";
import {schoolName} from "./stringMethods";

export const PopulateSessionContext = (sessionData, setSessionContext, setUserContextSet, history=null, setHelperFunctionDone)=> {
    if (sessionData) {
        if (sessionData.sessionUserDetails != null) {
            const {id, firstName, lastName, emailAddress, imageUrl} = sessionData.sessionUserDetails;
            setSessionContext(firstName, lastName, emailAddress, imageUrl, id);
            setUserContextSet(true);
        }
        setHelperFunctionDone(true);
    }
};

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

export const applyFilters = (storeItems, filters) => {
    return (
      storeItems.filter((item) => {
          let keepItem = true;
          for (let filter of filters) {
              switch (filter.filterType) {
                  case "Campus": {
                      const targetCampus = filter.value;
                      const itemCampusId = schoolName(item.seller.emailAddress);
                      const itemCampus = campuses.filter((campus) => campus.id === itemCampusId)[0].title;
                      if (itemCampus !== targetCampus) {
                          keepItem = false;
                      }
                      break;
                  }
                  case "Category": {
                      const targetCategory = filter.value;
                      const itemCategory = item.category;
                      if (itemCategory !== targetCategory) {
                          keepItem = false;
                      }
                      break;
                  }
                  case "Neighborhood": {
                      const targetNeighborhood = filter.value;
                      const itemNeighborhood = item.neighborhood;
                      if (itemNeighborhood !== targetNeighborhood) {
                          keepItem = false;
                      }
                      break;
                  }
                  case "Price": {
                      const targetPriceMin = parseInt(filter.value[0]);
                      const targetPriceMax = parseInt(filter.value[1]);
                      const itemPrice = parseInt(item.price);

                      if (itemPrice < targetPriceMin || itemPrice > targetPriceMax) {
                          keepItem = false;
                      }
                      break;
                  }
              }
          }
          return keepItem;
      })
    )
}