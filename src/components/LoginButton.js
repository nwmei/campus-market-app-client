import React from 'react';
import {useState, useEffect} from 'react'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { useContext } from 'react';
import { sessionContext } from './SessionContext';
import GoogleLogin from 'react-google-login';
import UserExistsQuery from '../queries/userExists.graphql';
import CreateUserMutation from '../mutations/CreateUser.graphql';

const LoginButton = ({navigateAfterLogin}) => {
  const [userData, setUserData] = useState({});
  const [createUser] = useMutation(CreateUserMutation);
  const [userExistsQuery, { loading, data: userExistsData }] = useLazyQuery(UserExistsQuery);
  const {value, setContextLoggedIn, setContextLoggedOut} = useContext(sessionContext);

  useEffect(() => {
    if (userExistsData != null) {
      const { userExists: {exists, id} } = userExistsData;
      let userId = id;
      if (!exists) {
        createUser({ variables: { input: { firstName: userData.firstName, lastName: userData.lastName, emailAddress: userData.emailAddress }}})
        .then((data) => userId = data.createUser.id);
      }
      setContextLoggedIn(userData.firstName, userData.lastName, userData.emailAddress, userData.imageUrl, userId);
      setUserData({...userData, userId})
      navigateAfterLogin();
    }
  }, [userExistsData])

  
  const loginSuccessHandler = async (response) => {
    setUserData({
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      emailAddress: response.profileObj.email,
      imageUrl: response.profileObj.imageUrl,
    })
    userExistsQuery({ variables: { input: { emailAddress: response.profileObj.email } }})
  }

  return (
    <GoogleLogin 
      clientId='520656774669-cu3glhtg7lagohl6aot0muen2gqtshsi.apps.googleusercontent.com' 
      buttonText='login' 
      onSuccess={loginSuccessHandler} 
      onFailure={(e)=>console.log(e)} 
      cookiePolicy={'single_host_origin'}
    >
    </GoogleLogin>
  )
}

export default LoginButton;