import React, {createContext} from 'react';
import {schoolName, userInitials} from '../utils/stringMethods';

export const sessionContext = createContext(null);

export default class SessionContextProvider extends React.Component {
  value = {
    userLoggedIn: false,
    userFirstName: '',
    userLastName: '',
    userEmailAddress: '',
    userId: '',
    school: '',
    userInitials: '',
    imageUrl: '',
  }

  setUserLoggedIn = (fName, lName, email, imageUrl, id) => {
    sessionStorage.setItem('userLoggedIn', 'true')
    sessionStorage.setItem('fName', fName);
    sessionStorage.setItem('lName', lName);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('imageUrl', imageUrl);
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('schoolName', schoolName(email));
    sessionStorage.setItem('userInitials', userInitials(fName, lName));
    this.value.userLoggedIn = true;
    this.value.userFirstName = fName;
    this.value.userLastName = lName;
    this.value.userEmailAddress = email;
    this.value.userId = id;
    this.value.school = schoolName(email);
    this.value.userInitials = userInitials(fName, lName);
  }

  setUserLoggedOut = () => {
    sessionStorage.setItem('userLoggedIn', 'false')
    sessionStorage.setItem('fName', '');
    sessionStorage.setItem('lName', '');
    sessionStorage.setItem('email', '');
    sessionStorage.setItem('imageUrl', '');
    sessionStorage.setItem('id', '');
    sessionStorage.setItem('schoolName', '');
    sessionStorage.setItem('userInitials', '');
    this.value.userLoggedIn = false;
    this.value.userFirstName = '';
    this.value.userLastName = '';
    this.value.userEmailAddress = '';
    this.value.userId = '';
    this.value.school = '';
    this.value.userInitials = '';
  }

  out = {
    value: this.value,
    setContextLoggedIn: this.setUserLoggedIn,
    setContextLoggedOut: this.setUserLoggedOut
  }

  render() {
    return (
      <sessionContext.Provider value={this.out}>
        {this.props.children}
      </sessionContext.Provider>
    )
  }
}