import React from "react";

export const PopulateSessionContext = (sessionData, setSessionContext, setUserContextSet, history, setHelperFunctionDone)=> {
    if (sessionData) {
        if (sessionData.sessionUserDetails != null) {
            const {id, firstName, lastName, emailAddress, imageUrl} = sessionData.sessionUserDetails;
            setSessionContext(firstName, lastName, emailAddress, imageUrl, id);
            setUserContextSet(true);
        }
        setHelperFunctionDone(true);
    }
}

export const getAlternateImageUrl = () => {
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Stick_Figure.svg/1200px-Stick_Figure.svg.png";
}
