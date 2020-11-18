import React from "react";

export const PopulateSessionContext = (sessionData, setSessionContext, setUserContextSet, history)=> {
    if (sessionData) {
        if (sessionData.sessionUserDetails != null) {
            const {id, firstName, lastName, emailAddress, imageUrl} = sessionData.sessionUserDetails;
            setSessionContext(firstName, lastName, emailAddress, imageUrl, id);
            setUserContextSet(true);
        } else {
            history.push('/login')
        }
    }
}