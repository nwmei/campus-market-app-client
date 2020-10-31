import React, {createContext} from 'react';

export const sessionContext = createContext(null);

export default class SessionContextProvider extends React.Component {
  value = {
    userLoggedIn: false,
    userFirstName: '',
    userLastName: '',
    userEmailAddress: '',
    userId: '',
  }

  setUserLoggedIn = (fName, lName, email, id) => {
    this.value.userLoggedIn = true;
    this.value.userFirstName = fName;
    this.value.userLastName = lName;
    this.value.userEmailAddress = email;
    this.value.userId = id;
  }

  setUserLoggedOut = () => {
    this.value.userLoggedIn = false;
    this.value.userFirstName = '';
    this.value.userLastName = '';
    this.value.userEmailAddress = '';
    this.value.userId = '';
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