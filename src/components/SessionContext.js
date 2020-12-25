import React, {createContext} from 'react';
import {schoolName, userInitials} from '../utils/stringMethods';

export const sessionContext = createContext(null);

export default class SessionContextProvider extends React.Component {
  value = {
    userFirstName: '',
    userLastName: '',
    userEmailAddress: '',
    userId: '',
    school: '',
    userInitials: '',
    imageUrl: '',
  }

  setUser = (fName, lName, email, imageUrl, id) => {
    this.value.userFirstName = fName;
    this.value.userLastName = lName;
    this.value.userEmailAddress = email;
    this.value.userId = id;
    this.value.imageUrl = imageUrl;
    this.value.school = schoolName(email);
    this.value.userInitials = userInitials(fName, lName);
  }

  setUserLoggedOut = () => {
    this.value.userFirstName = '';
    this.value.userLastName = '';
    this.value.userEmailAddress = '';
    this.value.userId = '';
    this.value.school = '';
    this.value.userInitials = '';
    this.value.imageUrl = '';
  }

  out = {
    sessionContextValue: this.value,
    setSessionContext: this.setUser,
    clearSessionContext: this.setUserLoggedOut
  }

  render() {
    const {userDetails} = this.props;
    if (userDetails.sessionUserDetails && userDetails.sessionUserDetails.id) {
      this.setUser(userDetails.sessionUserDetails.firstName, userDetails.sessionUserDetails.lastName, userDetails.sessionUserDetails.emailAddress, userDetails.sessionUserDetails.imageUrl, userDetails.sessionUserDetails.id);
    }
    return (
      <sessionContext.Provider value={this.out}>
        {this.props.children}
      </sessionContext.Provider>
    )
  }
}